# Content requiring verification

Everything listed here is either **missing** or **unconfirmed**. None of it has been
invented or filled with a plausible guess. Items marked in the UI render a visible
`VERIFY` marker so nothing unconfirmed can quietly ship as fact.

Owner: Linkosys. Update `src/content/company.ts` and `src/content/solutions.ts`
once each item is confirmed, then remove the `verify: true` flag.

---

## 1. Federal registration identifiers — blocking for government sales

These are the first things a contracting officer looks for. The site currently
shows an explicit gap for each.

| Item | Status | Where it appears | Source of truth |
|---|---|---|---|
| **UEI (Unique Entity ID)** | Missing | Government page, About page | SAM.gov entity registration |
| **CAGE code** | Missing | Government page, About page | SAM.gov / DLA |
| **Primary NAICS codes** | Missing | Government page, About page | SAM.gov registration |
| **Socio-economic status** | Missing | Government page, About page | SAM.gov (small business, set-aside designations) |
| **California CMAS contract number** | Unconfirmed | Government page, About page | California DGS |

**Note on DUNS.** The previous site published `Duns Number: 0044771419`. Two problems:
DUNS numbers are nine digits and this value has ten, and DUNS was retired as the
federal identifier in favour of the UEI. It has been removed rather than
reproduced. Confirm the correct UEI instead.

**GSA contract `47QTCA21D004X`** is treated as verified — it appears in the contract
summary document already published on this site, and that scan is linked from the
Government page.

## 2. Capability statement — blocking for government sales

No capability statement exists. The Government page has a placeholder section
explaining this rather than a broken download link.

Needs a one-page PDF containing: legal name, UEI, CAGE, NAICS codes, contract
vehicles, core competencies, differentiators, past performance and a point of
contact. Everything must match the SAM.gov registration exactly.

## 3. Case studies and past performance — highest commercial impact

Three case studies are structured and rendered on `/case-studies`, the Government
page and each service page. All three are empty by design.

For each, Linkosys needs to supply, **with client approval to publish**:

- Client name, or an agreed anonymised description ("a California state agency")
- Challenge — the situation before the work
- Approach — what Linkosys did
- Solution — what was implemented
- Technology — platforms and languages actually used
- Results — only metrics the client has confirmed and approved

Populate `caseStudies` in `src/content/solutions.ts` and remove `placeholder: true`.

Nothing here should be estimated. A single unverifiable metric undermines every
other claim on the site.

## 4. Client logos and testimonials

The partners page displays logos including **Sony Pictures**, ANC, Bresatech,
Stixis, Letcore, Tran Creative, FAT, ITMS and Cyber Eye.

- Confirm written permission to display each logo.
- Three testimonials are attributed to named individuals at ANC, Bresatech and
  Eleganza Tiles. Confirm each quote is real and approved for publication.
- Those testimonials were paired with **stock photography** from the site template.
  Using a stock portrait beside a real person's name is a misrepresentation. Supply
  real photographs or approve removing the images and keeping name, role and company.

## 5. Company facts

| Item | Status | Notes |
|---|---|---|
| Founded 2016 | Unconfirmed | Drives the "years in business" counter on the contact page (`currentYear - 2016`) |
| Employee count | Not published | Not shown anywhere; do not add without a source |
| Office locations | Partially confirmed | Irvine, California published. Confirm whether the Virginia registration implies an office |
| Leadership biographies | Thin | Team page needs real roles and background |

## 6. Legal pages — missing

The footer previously listed "Privacy Policy" and "Terms & condition" as unlinked
text, and one entry pointed at a `terms-conditions` route that was never defined.
Those dead entries have been removed rather than linked to fabricated legal text.

Still required:

- Privacy policy — the contact form collects name, email, phone and company, so
  this is a genuine obligation, not a formality
- Terms of use
- Accessibility statement — government buyers look for this

## 7. Insights / blog content

The homepage and blog previously pulled TechRadar's consumer technology feed
through `api.rss2json.com` and presented it under the heading "Explore, Learn, And
Grow With Our Insightful Content". That has been removed: it was another
publisher's content, it sent every click off-site, and it depended on a
third-party service at page load.

`/company/blog` now states plainly that nothing is published yet. Suggested first
articles, based on what the target buyers search for:

1. Modernizing an application that cannot be taken offline
2. Connecting shop floor systems to ERP without replacing either
3. What a security assessment actually asks for

## 8. Open Graph image — done, review requested

`public/images/og-default.png` has been created (1200×630, logo on the dark navy
background with the two contract vehicles along the bottom). Replace it if
marketing wants different artwork; the path is referenced from `applySeo()`.

## 9. Spam protection — needs a real service

The contact form's arithmetic captcha is generated and checked in the browser. The
API now validates field formats, enforces length limits and includes a honeypot,
but a scripted client can still submit directly.

Recommendation: add Cloudflare Turnstile or reCAPTCHA and verify the token
server-side in `api/send-email.ts`. This needs an account and a secret added to
the Vercel environment, so it is left as a decision for Linkosys rather than
half-implemented.
