# Organic growth roadmap and operations

## Keyword ownership

These are candidate phrases supplied by the brief and grouped by buying intent. Commercial priority is qualitative business fit, not CPC or measured demand. Search volume and difficulty are **unmeasured for every row**; validate using Search Console queries and a keyword research source before assigning numeric difficulty or forecasting traffic. Do not create additional pages just to vary a keyword or city.

| Cluster / candidate phrases | Intent | Commercial priority | Primary destination | Conversion opportunity |
|---|---|---|---|---|
| IT consulting company California; enterprise IT consulting services; IT consulting for mid-sized businesses; technology consulting services USA; enterprise digital transformation consulting | Partner selection / assessment | High | `/services/it-consulting` | Discuss systems and roadmap |
| Custom software development California; enterprise software development company; custom business software development; enterprise application development; software development consulting USA | Implementation / vendor comparison | High | `/services/software-development` | Scope a business application |
| AI development company California; enterprise AI solutions; AI implementation consulting; custom AI software development; business process automation with AI | Feasibility / implementation | High | `/services/ai-and-data` | Discuss a bounded workflow and data |
| Cloud consulting services California; enterprise cloud migration services; cloud infrastructure consulting | Assessment / migration | High | `/services/cloud-infrastructure` | Review workloads and constraints |
| Enterprise cybersecurity consulting; managed IT security solutions | Risk / provider search | High, subject to service fit | `/services/cybersecurity` | Define security assessment scope; verify managed-service availability before targeting managed operations |
| Manufacturing software development; MES development; MES integration services; industrial automation software; IT/OT integration services | Plant integration / implementation | High | `/industries/manufacturing` | Discuss production process and interfaces |
| IT staffing; technology staff augmentation | Capacity / hiring | High | `/services/it-staffing` | Describe role, skills and timing |
| Enterprise technology partner California | Brand / broad discovery | High | `/` | Choose a practice or request consultation |

The homepage introduces the company and routes buyers; the consulting page owns detailed assessment/strategy intent. Software owns implementation; the comparison article owns the build-vs-buy question. Cloud and cybersecurity keep separate intent. Manufacturing combines MES, shop-floor and IT/OT questions in a substantive existing page. Check overlap through queries and landing pages over comparable 28-day periods rather than inferring cannibalization from repeated words.

## First 90 days

Approximately two substantive articles per month. The first two guides are implemented in the repository; subsequent items are editorial briefs, not published content. Confirm company authorship and technical review before release. Add a verified individual byline and Person schema only when the named author approves it. Dates in the initial guides record preparation on 21 November 2026; update to the actual publication date if release is delayed. Never auto-refresh dates on rebuilds.

| Window | Article / business question | Cluster | Required practical material | Internal links / CTA |
|---|---|---|---|---|
| Days 1–30 | How to choose an enterprise IT consulting partner in California — implemented | Consulting | Procurement checklist, delivery evidence, onsite requirements, discovery outputs | Consulting, program management, manufacturing; consultation |
| Days 1–30 | Custom software vs. off-the-shelf — implemented | Software | Workflow fit, cost categories, hybrid options, acceptance checklist | Software, consulting, cloud; discuss decision |
| Days 31–60 | How AI automation can improve business operations | AI | A bounded example approved by an engineer; data access, evaluation, human review and operating cost | AI/data and software; workflow assessment |
| Days 31–60 | Enterprise cloud migration: strategy and best practices | Cloud | Workload inventory, dependencies, identity/network baseline, pilot/rollback checklist; no promised savings | Cloud and cybersecurity; workload discussion |
| Days 61–90 | Cybersecurity priorities for mid-sized businesses | Security | Risk-based control ownership, recovery testing and evidence; technical review | Cybersecurity and consulting; assessment discussion |
| Days 61–90 | How manufacturers benefit from MES software | Manufacturing | ERP/MES responsibility map, operator workflow, interface recovery, pilot/cutover checklist; approved plant example if available | Manufacturing, software, AI/data; integration consultation |

Each future article needs a concise direct answer, useful decision criteria, source links for technical claims, a reviewed example or checklist, visible author/date, Article JSON-LD, related service links and a consultation CTA. Avoid invented benchmarks, prices or outcomes. Revise existing guides using actual buyer questions rather than publishing near-duplicates.

## California presence and authority

Use the existing Irvine NAP: Linkosys Inc.; 100 Spectrum Center Dr, Irvine, California, USA; +1 949 354 4225; info@linkosys.com. Confirm staffed office, customer-facing eligibility, postal details and service arrangements with the company before establishing a Google Business Profile. Do not add other offices, hours or a location-page network. Review Orange County, Los Angeles, San Diego, San Francisco and Sacramento opportunities only after the company provides distinct local service evidence, approved work or practical onsite information.

Days 1–30: confirm public company facts and authorized social URLs; reconcile legitimate business-directory listings to one NAP; claim eligible profiles under a company-owned account. Request permission for existing client logos and project descriptions.

Days 31–60: identify relevant California business associations, engineering communities and manufacturing publications. Have a named subject expert contribute a useful technical explanation or approved project insight. Ask genuine clients for honest reviews without incentives or prescribed wording. Company staff should send outreach; no messages or listings were submitted during this work.

Days 61–90: publish an approved original checklist or technical diagram worth referencing, seek relevant editorial coverage, and review referral quality. Evaluate broader U.S. query demand using Search Console. Avoid bought links, bulk directory submissions and recycled location pages.

## Analytics and account setup

The existing GA4 tag `G-L81Y5QMP4Y` is retained. No additional tags or tracking dependencies were added. Events are queued by the existing shim; actual receipt is unverified without account access and a production test.

| Event | Trigger | Interpretation |
|---|---|---|
| `page_view` | Resolved Vue route | Page visit; query strings omitted from explicit page_location |
| `generate_lead` | API returns success after mail-provider acceptance; honeypot field empty | Contact submission, **not a qualified lead** or proof of inbox delivery |
| `consultation_request` | Internal link to `/contact` clicked | Consultation intent click; **not a submitted request** |
| `business_email_click` | mailto link clicked | Email intent, not an email received |
| `phone_click` | tel link clicked | Call intent, not a completed call |
| `cta_click` | Other internal button link clicked | CTA interaction with destination path |

No names, email addresses, telephone numbers, company names, message text, service query values or arbitrary link text are sent by the new conversion handlers. Existing GA automatic collection and third-party chat are separate integrations; evaluate their settings separately.

1. Search Console: a company owner should add/verify the `linkosys.com` domain property using the provider-issued DNS TXT record. Submit `https://linkosys.com/sitemap.xml`; inspect homepage, consulting, software, AI, cloud, security, manufacturing, contact and both articles after deployment. Supply read access or exports for query/indexing analysis, not passwords.
2. GA4: use the existing property and data stream. Verify manual page_view in DebugView; disable enhanced-measurement history-change pageviews if enabled to avoid duplication with router events. Do not count automatic form_submit as the primary lead. Mark `generate_lead` as a key event, and keep intent clicks separate from submissions. Test success, provider failure, validation failure and double-click behavior in a preview/test setup; do not send fake enquiries to the real inbox.
3. Bing Webmaster Tools: a company owner should verify the canonical domain using the account-issued verification method, then submit the same sitemap. Keep verification tokens in platform configuration or a provider-issued public verification file. No token is invented or committed here.
4. Google Business Profile: confirm eligibility and ownership first, then verify the actual business details. An office address on a website is not proof of profile eligibility.
5. Contact delivery: in the hosting project's environment settings, confirm `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (an authorized sender on a domain verified with Resend) and `CONTACT_TO_EMAIL` (approved recipients; comma-separated is supported). Redeploy after environment changes. Run an explicitly approved real delivery test and check both provider logs and recipient inbox. Existing defaults remain unchanged; no credentials were read.
6. Stronger spam protection remains outstanding: provision a server-verified challenge service, restrict its site key to approved domains, and provide its public site key plus server-only secret. Then implement token verification in `api/send-email.ts`, reject missing/invalid tokens before email dispatch, reset tokens after attempts and test provider outages. Apply hosting firewall/rate limits as appropriate. The current honeypot and browser arithmetic are basic friction, **not robust bot protection**; no half-configured challenge is shipped.

## Dashboard and measurement

Use an owner-controlled dashboard combining Search Console and GA4, with a CRM/manual lead-quality view joined at an aggregate level. Review weekly; compare complete 28-day periods with device, geography, channel and landing-page filters. Record a release date and baseline before claiming an effect.

| Metric | Source | Interpretation / cadence |
|---|---|---|
| Organic clicks, impressions, CTR, average position | Search Console | Segment California/commercial clusters and landing pages; weekly |
| Organic landing-page sessions | GA4 | Session source/medium plus landing page; weekly |
| Submissions and intent clicks | GA4 events above | Deduplicate pageviews; distinguish clicks from accepted mail; weekly |
| Qualified leads / opportunities | CRM or company-reviewed enquiry log | Company must define qualification and tag source; weekly |
| Qualified conversion rate | Qualified organic leads / organic sessions | Show numerator and denominator; do not substitute form clicks |
| Indexed pages | Search Console / Bing | Review exclusions and canonical choice, not sitemap size alone |
| LCP, INP, CLS | Search Console field data / CrUX; Lighthouse for diagnosis | Mobile and desktop separately; establish baseline and monitor after release |
| AI visibility | Monthly manual brand/query/citation checks | Log engine, exact prompt, date, locale, cited URL and observation; separate from verified analytics |

No keyword volumes, ranking improvements, lead gains, AI mentions or Core Web Vitals scores have been measured or claimed in this implementation. llms.txt is supplementary; it is not a guaranteed ranking signal. Visible FAQs support readers and direct answers; FAQPage rich-result eligibility is not promised.

## Company inputs still required

Confirm service delivery/on-site coverage, managed security scope, office/GBP eligibility, accurate postal address, current credentials (including BBB and contract status), approved client evidence, measurable case-study results, named technical reviewers, social profile URLs, real team photos, contact response commitments and retention/analytics policy. Existing verification items remain in `docs/CONTENT-VERIFICATION.md`. Do not expand public claims until supporting materials are approved.

## References checked

- Existing public company information: https://linkosys.com/
- Accurate sitemap dates: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- GA4 recommended lead events: https://developers.google.com/analytics/devguides/collection/ga4/reference/events
- FAQ rich-result restrictions: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Vercel static 404 handling: https://vercel.com/docs/routing/custom-404-pages
