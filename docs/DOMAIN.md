# Domain, subdomains and deliverability

Written after a visitor on Spectrum (US) hit a "Suspicious Site Blocked"
interstitial from Spectrum Security Shield, the ISP-level filter CUJO AI runs
for them. The block page was served from `hosted.cujo.io`, so the decision was
made by a DNS-level reputation filter, not by the browser and not by anything in
the page.

The site itself came back clean. What did not is everything else on the domain.

## What was checked, and what it showed

| Check | Result |
|---|---|
| Production HTML vs the local build | **Byte-identical.** Nothing injected. |
| Third-party origins loaded | Two: `googletagmanager.com`, `cdnjs.cloudflare.com` |
| Cookies set | Two: `_ga`, `_ga_L81Y5QMP4Y` |
| Google Safe Browsing | No unsafe content found |
| Spamhaus DBL, SURBL | Not listed |
| Domain registration | Created 2016-06-18, expires 2027-06-18, Tucows |
| Contact form endpoint | Alive; validation, honeypot and a real send all behave correctly |

## The subdomains — cleaned up 2026-09-30

Certificate Transparency lists 18 names under `linkosys.com`. Four of them used
to point at DigitalOcean hosts and none of the four worked: `chat` and
`cryptoket` failed TLS outright with certificates that expired on 2026-09-07 and
2026-08-24, and `realestate` and `api` answered nothing at all. To an automated
reputation scanner that reads as expired certificates, dead hosts and a
crypto-named subdomain — close to the signature of a domain that has been
abandoned or compromised, and the likeliest reason the Spectrum filter fired.

**Those A records have since been deleted.** Verified against both authoritative
nameservers: no name now points at 159.89.206.122 or 143.198.147.118, TLS fails
for `chat` and `cryptoket` because there is no certificate to serve, HTTP returns
404 from Vercel, and no new certificate has been issued for any subdomain.

## The wildcard is gone — and it took www with it

The wildcard has been deleted, along with every stale subdomain record. Verified
against both Hover nameservers: `chat`, `cryptoket`, `realestate`, `api` and
`cpanel` no longer resolve, and an invented name returns NXDOMAIN instead of a
Vercel address. That closes the unbounded subdomain surface.

**`www.linkosys.com` now returns NXDOMAIN.** It had no A record of its own — it
was resolving through the wildcard the whole time, which is why a DNS answer for
it looked identical to an explicit record from outside. With the wildcard gone,
anyone typing `www.linkosys.com` gets a name-resolution failure, not a redirect:

```
www.linkosys.com   A   -> NXDOMAIN   (ns1.hover.com, ns2.hover.com, 1.1.1.1, 8.8.8.8)
https://www.linkosys.com/   -> connection fails
https://linkosys.com/       -> 200
```

This is worse for a www visitor than the state that started this whole
investigation. It needs an explicit record in Hover:

| Type | Name | Value |
|---|---|---|
| A | `www` | `216.198.79.1` |

That is the address the apex uses and the one `www` resolved to from
2026-09-17 to 2026-09-30, during which Vercel issued it a certificate and served
the 308 redirect correctly, so it is proven on this domain. `vercel domains
inspect` reports `76.76.21.21` instead; both are Vercel anycast addresses and
either satisfies the check, but the proven one is the safer choice.

The `www` → apex redirect in `vercel.json` is unaffected and starts working
again as soon as the name resolves.

## DMARC is still missing

Re-checked on both Hover nameservers and two public resolvers: `TXT
_dmarc.linkosys.com` returns an empty answer. SPF, the five MX records and the
Google site verification all survived both cleanups; only DMARC did not.

| Type | Name | Value |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dong@linkosys.com; pct=100; adkim=s; aspf=s` |

## Email authentication — unresolved

The contact form sends through Resend. The domain's SPF record authorizes only
Google:

```
v=spf1 include:_spf.google.com ~all
```

DMARC is strict and set to quarantine:

```
v=DMARC1; p=quarantine; rua=mailto:dong@linkosys.com; pct=100; adkim=s; aspf=s
```

There is **no Resend DKIM record** at `resend._domainkey.linkosys.com` and no
`send.linkosys.com` MX, which are what Resend publishes when a custom domain is
verified. So if the form sends from an `@linkosys.com` address, those
notifications fail both SPF and DKIM, fail DMARC alignment, and are quarantined
— meaning enquiries may be landing in spam or not arriving.

This could not be settled from outside: `CONTACT_FROM_EMAIL` is a Vercel
environment variable and reading it would have materialized credentials. A real
submission was accepted by Resend, which means the From address is *either* a
verified `@linkosys.com` sender (in which case the DNS records above are missing
and should be added) *or* a Resend-owned address such as `@resend.dev` (in which
case delivery is fine but the sender looks wrong to recipients).

**Open the notification email and read its From header** — that answers it in
one look, and tells you whether it landed in the inbox or in spam.

## Security headers

The marketing site sent only `Strict-Transport-Security`. `vercel.json` now also
sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` and a narrow `Content-Security-Policy`.

The CSP deliberately carries only `object-src 'none'; base-uri 'none';
frame-ancestors 'none'`. A `script-src` or `style-src` policy would need
`'unsafe-inline'` here — the critical CSS and the analytics queue are both
inline by design — which would look like a policy while permitting the thing a
policy exists to stop.
