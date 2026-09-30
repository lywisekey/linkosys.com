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

## The subdomains are the problem

Certificate Transparency lists 18 names under `linkosys.com`. Four still have
DNS pointing somewhere, and none of the four works:

| Name | Points at | State |
|---|---|---|
| `chat.linkosys.com` | 159.89.206.122 (DigitalOcean) | TLS handshake fails — certificate expired 2026-09-07. HTTP returns 403. |
| `cryptoket.linkosys.com` | 159.89.206.122 (DigitalOcean) | TLS handshake fails — certificate expired 2026-08-24. HTTP returns 403. |
| `realestate.linkosys.com` | 143.198.147.118 (DigitalOcean) | No response at all |
| `api.linkosys.com` | 143.198.147.118 (DigitalOcean) | No response at all |

The 403s return `{"error": "Yêu cầu không được phép."}` from nginx with a strict
security header set, so that host is ours and is refusing unauthenticated
requests rather than having been taken over. That is the reassuring part.

The rest is not. To an automated reputation scanner this domain presents as:
several subdomains with **expired certificates**, two more that **resolve but
answer nothing**, and one of them named `cryptoket` — crypto and NFT naming is
a category most threat feeds weight as high risk on its own. Expired TLS plus
dead hosts plus crypto naming is close to the signature of a domain that has
been abandoned or compromised, which is the likeliest reason the filter fired.

There is also a **wildcard DNS record**: `*.linkosys.com` resolves to
216.198.79.1, so any invented name answers. Nothing is actually served — the TLS
handshake fails for hostnames Vercel does not know — but it makes the domain
look larger and less managed than it is.

None of this is fixed here, because it is DNS and infrastructure rather than
code. The options, in order of how much they help:

1. Delete the DNS records for `realestate` and `api`. They point at a host that
   answers nothing.
2. Renew the certificates on `chat` and `cryptoket`, or delete their records
   too if those services are retired. A subdomain that only ever fails TLS is
   worse than one that does not exist.
3. Remove the wildcard record and declare subdomains explicitly.
4. Ask Spectrum to re-review the domain under Security Shield, after the above,
   so the reclassification is assessed against a clean domain.

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
