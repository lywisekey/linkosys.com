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

## The wildcard is gone, and www is back — resolved 2026-09-30

The wildcard and every stale subdomain record have been deleted. `chat`,
`cryptoket`, `realestate`, `api`, `dev`, `m`, `chemical`, `mail`, `webmail`,
`cpanel` and any invented name all return NXDOMAIN on both Hover nameservers.

Removing the wildcard took `www.linkosys.com` down with it, because `www` had no
record of its own — it had been answered by the wildcard the whole time, which is
why its DNS answer was indistinguishable from an explicit record when checked
from outside. For a while it was NXDOMAIN, then briefly a CNAME whose value was
an IP address, which Hover expanded to `216.198.79.1.linkosys.com` — a name that
does not exist. A CNAME target has to be a hostname; that is a DNS rule, not a
Hover limitation.

It now reads:

```
www.linkosys.com.   300   IN   CNAME   linkosys.com.
linkosys.com.       300   IN   A       216.198.79.1
```

A CNAME to the apex, which resolves correctly and has the advantage of following
the apex automatically if that address ever changes. Verified end to end: the
certificate covers `www.linkosys.com` and runs to 2026-12-16, the first hop is a
308, and path and query survive it.

| Entry point | Ends at |
|---|---|
| `https://www.linkosys.com/` | `https://linkosys.com/` |
| `https://www.linkosys.com/services/cybersecurity` | same path on the apex |
| `https://www.linkosys.com/contact?utm_source=card` | query preserved |
| `http://www.linkosys.com/government` | `https://linkosys.com/government` |

The apex is untouched: `/`, `/privacy`, `/services`, `/llms.txt` and
`/sitemap.xml` all answer 200 with zero redirects.

## DMARC — restored

```
v=DMARC1; p=quarantine; rua=mailto:dong@linkosys.com; pct=100; adkim=s; aspf=s
```

Confirmed on both Hover nameservers and on 1.1.1.1, 8.8.8.8 and 9.9.9.9. SPF and
the five Google MX records were never lost.

## State at the point of appealing to Spectrum

| | |
|---|---|
| Stale subdomains | none resolve |
| Wildcard | removed |
| `www` | CNAME to apex, valid certificate, 308 |
| SPF / DMARC / MX | all present |
| Google Safe Browsing | clean |
| Spamhaus DBL, SURBL | not listed |
| Site | 11 routes OK, no console errors |
| Security headers | 6 of 6 |
| Third-party origins | two, both expected |

Every adverse signal found in this investigation is gone. What remains is the
classification itself, which only Spectrum can change — see the request form in
the section below.

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
