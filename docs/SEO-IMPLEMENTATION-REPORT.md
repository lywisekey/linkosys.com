# Linkosys SEO, AEO, GEO and conversion implementation

## Outcome

Implemented directly in the existing Vue/Vite repository. The framework, existing URLs, contact endpoint, government capabilities, branding, analytics property and third-party integrations are preserved. No dependencies were added. Changes are local and uncommitted; nothing was deployed or submitted to external accounts.

The initial audit is in `SEO-GROWTH-AUDIT.md`; keyword ownership, content calendar, account setup, authority recommendations and dashboard specification are in `SEO-GROWTH-ROADMAP.md`.

## Pages improved

- `/`: enterprise IT consulting/software positioning; published Irvine/California context, U.S. coverage, mid-sized business and manufacturing relevance, direct consulting path and consultation CTA.
- `/services`: consulting and engineering overview, automatically including the new practice in cards, navigation and footer.
- `/services/it-consulting`: new substantive assessment/roadmap landing page; distinct from software implementation, with capabilities, challenges, benefits, process, FAQs, related services and inquiry path.
- Existing software-development, ai-and-data, cloud-infrastructure, cybersecurity, it-staffing and program-management service URLs: descriptive H1s, business benefits, direct-answer FAQs and context-preserving consultation links.
- `/industries/manufacturing`: explicit software/MES H1, MES definition, ERP comparison and phased implementation answers; manufacturing interest carries into contact.
- `/company/aboutus`: consulting/engineering description aligned with the service offering.
- `/company/blog`: replaces the empty state with two practical guides.
- `/company/blog/choose-enterprise-it-consulting-partner-california` and `/company/blog/custom-software-vs-off-the-shelf`: new question-led guides, checklists, company byline, preparation date, table of contents, related service links, consultation CTA and Article metadata. Company technical/editorial review is still needed before release.
- `/contact`: service interest prefill from an allowlist, persistent accessible error announcement, focused feedback, captcha error association, non-JavaScript contact alternatives and successful-submission tracking.
- `/commingsoon`: preserves the existing URL with a useful branded placeholder, H1, navigation and crawlable noindex HTML.
- All 27 indexable pages: static WebPage/entity relationships and breadcrumbs, matching client-side navigation; footer contact URI/headings improved globally.

## SEO / AEO / GEO changes

One metadata source continues to drive routing, prerendering, sitemap and llms.txt. Organization is retained, WebSite is added, and a shared builder emits WebPage, BreadcrumbList, Service and Article relationships in initial HTML and after navigation. Broken synthetic `/company` breadcrumb parents are removed. Provider, publisher and author references resolve to the existing Organization entity. No Person identities, ratings, awards or reviews were invented; an Organization author is used for company guides.

Direct answers remain visible in normal HTML; FAQs need no accordion or JavaScript interaction. No FAQPage rich-result promise or schema is added. Headings identify service intent and guides answer actual buying questions. Service benefits describe intended value rather than measured results. California positioning uses the published Irvine office; no city doorway pages or new offices were created.

Eight legacy redirects are mirrored in Vercel as permanent server redirects and tested against Vue's redirects. Build output includes all 28 known routes, a branded static 404 and the retained noindex fallback asset. Removing the catch-all rewrite allows Vercel's documented static 404 behavior; verify actual HTTP status on the target deployment. Noindex pages omit canonical/og:url and are excluded from sitemap and llms.txt. The coming-soon URL is crawlable so its noindex can be read. Sitemap generation no longer falsely assigns every page the build date.

Existing critical CSS extraction, font preloads, self-hosted fonts, deferred app delivery and lazy decorative illustrations are retained. The consulting illustration is a small native SVG consistent with existing artwork. No measured performance improvement is claimed; Vite still reports a main chunk over 500 kB. Evaluate route/plugin/icon registration and third-party scripts using measured mobile performance before wider changes.

## Conversion instrumentation

Existing GA4 tag retained, no duplicate tag added. New fixed-label events measure contact intent, business-email click, telephone click and other button-link interactions. `generate_lead` fires only after a successful API response and skips filled honeypots; loading/sent guards prevent repeated form sends in the UI. Personal contact fields are not included in these events. Explicit pageview location omits query strings. Intent clicks are distinct from submitted or qualified leads; inbox delivery and lead quality require separate verification.

Existing server-side validation, HTML escaping, honeypot and Resend handling are unchanged and regression-tested. The browser arithmetic challenge is still bypassable. Server-verified bot protection needs company credentials and implementation as described in the roadmap; it has not been claimed complete.

## Validation

- `npm run type-check`: passed.
- `npm test`: passed, 9 tests; all 28 route metadata entries and invalid detail slugs exercised, all eight server/client redirects compared, mail failure/escaping/validation/honeypot boundaries checked, conversion delegation and event privacy checked.
- `npm run build`: passed; 28 routes prerendered plus branded 404, critical CSS inlined.
- `python3 scripts/validate-built-site.py`: passed; 27 indexable pages, 1,811 local link/asset references, unique titles/descriptions, canonical and social tags, one H1, image alt presence, valid JSON parsing and resolvable entity references, breadcrumb destinations, anchors, required contact fields, noindex fallback/coming-soon/404 and absence of catch-all rewrite.
- `git diff --check`: passed.
- Preview server started successfully after sandbox network permission. Browser tool returned “The browser access host is unavailable.” No desktop/mobile screenshot, visual contrast/overflow audit or browser interaction test was possible. Responsive Bootstrap layouts are preserved; visual verification remains a release check.
- No live email was sent, no analytics account was accessed, no real crawler index or measured Core Web Vitals was checked. Static JSON-LD validation does not replace an external rich-result/schema validator.

## Release checks and owner dependencies

Before production release, review the two company-attributed guides, service scope, current credentials and contact response commitments. Supply the existing verification tracker items (approved client evidence, current contracts, real results, author/profile approvals, office eligibility and legal/data policies).

On a Vercel preview deployment, verify direct deep links return content, unknown paths return HTTP 404, eight legacy URLs return permanent redirects and retain expected query parameters, apex/HTTPS behavior is correct, sitemap/robots/llms are plain accessible files, and API routing is unchanged. Run mobile/desktop browser checks for menu, forms, errors, focus, CTA prefills and article anchors. Check Rich Results Test/Schema Markup Validator, then Lighthouse/PageSpeed and field data when available.

Confirm Resend configuration and authorized sender, install robust server-verified spam protection with issued credentials, and complete an owner-approved delivery test. Verify the existing GA4 stream and disable duplicate enhanced-measurement history pageviews if configured. Company owners must verify Search Console/Bing, submit sitemap, review GBP eligibility and define qualified leads. Exact environment variable names, event meanings and dashboard sources are in the roadmap.

The 90-day plan is two initial guides, then AI/cloud and cybersecurity/MES articles with technical review, plus legitimate California authority/profile work. No rankings, traffic, AI citation counts or lead uplift are asserted.

## File inventory
- `components.d.ts`
- `docs/CONTENT-VERIFICATION.md`
- `index.html`
- `public/llms.txt`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/generate-sitemap.mjs`
- `scripts/load-seo-routes.mjs`
- `scripts/prerender-html.mjs`
- `scripts/tests/router-navigation.test.mjs`
- `src/components/linkosys/CtaBand.vue`
- `src/components/linkosys/serviceIllustrations.ts`
- `src/content/industries.ts`
- `src/content/seo-routes.ts`
- `src/content/services.ts`
- `src/helpers/analytics.ts`
- `src/helpers/seo.ts`
- `src/layouts/components/Footer.vue`
- `src/main.ts`
- `src/router/index.ts`
- `src/router/linkosys.ts`
- `src/views/Linkosys/IndustryDetail.vue`
- `src/views/Linkosys/ServiceDetail.vue`
- `src/views/Linkosys/ServicesIndex.vue`
- `src/views/Linkosys/aboutus.vue`
- `src/views/Linkosys/blog.vue`
- `src/views/Linkosys/commingsoon.vue`
- `src/views/Linkosys/components/ContactForm.vue`
- `src/views/Linkosys/homepage.vue`
- `vercel.json`
- `docs/SEO-GROWTH-AUDIT.md`
- `docs/SEO-GROWTH-ROADMAP.md`
- `docs/SEO-IMPLEMENTATION-REPORT.md`
- `scripts/tests/analytics.test.mjs`
- `scripts/validate-built-site.py`
- `src/assets/images/illus/it-consulting.svg`
- `src/components/linkosys/AnswerSection.vue`
- `src/content/faqs.ts`
- `src/content/insights.ts`
- `src/content/structured-data.ts`
- `src/views/Linkosys/InsightDetail.vue`
