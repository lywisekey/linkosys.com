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

## The wildcard is still there

```
*.linkosys.com.   300   IN   A   216.198.79.1
```

This is now the only reason the old names resolve at all: `chat`,
`cryptoket`, `realestate`, `api`, `cpanel`, `webmail` and an invented name like
`zzz-17780.linkosys.com` all return the same Vercel address, because the
wildcard answers for everything.

Nothing is served — Vercel has no certificate for names it does not know, so TLS
fails, and plain HTTP returns 404. The remaining cost is that the domain
presents an unbounded subdomain surface to anything enumerating it.

Before deleting it, check in the Hover panel that `linkosys.com` and
`www.linkosys.com` have their **own** A records. A wildcard answer is
indistinguishable from an explicit one in a DNS response, so this cannot be
settled from outside — and if `www` is only resolving through the wildcard,
removing it takes the site's second hostname down.

## DMARC was deleted in the cleanup — restore it

On 2026-09-24 the domain published:

```
v=DMARC1; p=quarantine; rua=mailto:dong@linkosys.com; pct=100; adkim=s; aspf=s
```

On 2026-09-30 it publishes nothing. Both Hover nameservers and three public
resolvers return NOERROR with an empty answer for
`TXT _dmarc.linkosys.com`. The name still resolves — the wildcard gives it an A
record — but the policy is gone.

`_dmarc` is a subdomain name, so it was most likely swept up with the others.
SPF, the MX records and the Google site verification all survived; only DMARC
went.

This matters more than usual right now. Without a DMARC policy nothing tells a
receiving server what to do with mail that fails authentication while claiming
to be from linkosys.com, and mail authentication posture is an input to the same
domain reputation systems that produced the block in the first place. The
cleanup removed one adverse signal and added another.

Re-add it as a TXT record on `_dmarc`, exactly as above.

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
