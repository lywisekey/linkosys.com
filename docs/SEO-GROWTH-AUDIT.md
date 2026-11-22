# Linkosys growth audit — 21 November 2026

## Baseline inspected before implementation

Vue 3 + TypeScript + Vue Router, Vite, Bootstrap Vue Next, data-driven services and industries; Vue server rendering at build time with critical CSS extraction. Vercel hosting configuration and Resend contact endpoint. Existing production GA4 property G-L81Y5QMP4Y. Working tree was clean; no AGENTS.md found. Reviewed active router, all marketing page templates, content models, navigation/footer, metadata helpers, prerender pipeline, sitemap/robots/llms generators, contact UI/API and existing tests. Template/demo/shop files are not routed; they are not competing public pages.

Live homepage inspection: https://www.linkosys.com/ resolves to https://linkosys.com/. Preserve the established apex canonical. Production content confirms the Irvine address, published telephone/email and nationwide enterprise/government positioning. This is a content/implementation audit, not a Search Console, backlink or measured Core Web Vitals audit.

## Priorities

| Priority | Finding | Action |
|---|---|---|
| Critical | Lead delivery and spam filtering depend on deployment credentials; browser arithmetic is bypassable | Preserve validated API/honeypot, improve accessible errors and measure only accepted submissions; document server-verified challenge and provider setup |
| High | Legacy service redirects exist only in Vue, returning fallback HTML to non-JS crawlers | Mirror redirects in Vercel configuration |
| High | Breadcrumb JSON-LD is only added in browser; generated `/company` breadcrumb points at a missing page | Share one graph builder between static and client rendering, use real parent destinations |
| High | Unknown URLs receive a noindex SPA document with HTTP 200 (soft 404) | Prerender every known route and branded 404; remove catch-all rewrite |
| High | Homepage emphasizes general/government messaging over California enterprise buying intent | Refocus hero and enterprise path; retain government offering |
| High | Service pages lack direct answers, FAQs and clear service H1s | Add visible question/answer sections, benefits and explicit headings; preserve capabilities |
| High | IT consulting has no dedicated service destination | Add distinct assessment/roadmap service using existing consulting/delivery capabilities |
| High | Only page_view is measured | Add accepted-form, consultation, email, telephone and CTA events without submitted personal data |
| Medium | Sitemap labels every page changed on each build | Omit lastmod until actual content dates are maintained |
| Medium | Insights is an empty destination; no commercial content funnel | Publish two practical guides with contextual service links; prepare six-topic 90-day calendar |
| Medium | Manufacturing H1 does not identify MES or the service | Add explicit manufacturing/MES heading and implementation answers |
| Medium | Critical CSS, self-hosted fonts and prerendering already exist; full Bootstrap/dependencies and third-party chat remain performance candidates | Preserve existing optimizations; retain sticky integration used by the partners component; measure mobile after deployment |
| Low | Footer jumps from H2 to H5/H6; inconsistent telephone URI | Use styled paragraphs for footer labels and shared contact constants |

## Duplication and local strategy

One destination per commercial intent: consulting assessment, software implementation, AI/data, cloud, security, staffing, manufacturing/MES. `/projects` is a portfolio and `/case-studies` explains delivery; keep their intent distinct. Existing solutions use anchored sections rather than duplicate landing pages. Do not create city doorway pages. Use Irvine/California context on the homepage and consulting page; other city coverage and office locations require company confirmation. Keyword difficulty/volume and current cannibalization need actual search data; no estimates are presented as measured facts.

## Implementation checklist

- [x] Inspect architecture, content, conversion funnel and existing integrations before edits.
- [x] Improve enterprise homepage, service headings, FAQs, manufacturing and consulting.
- [x] Align prerender and client metadata graphs; preserve verified Organization entity.
- [x] Add permanent legacy redirects and truthful sitemap dates.
- [x] Improve contact errors and conversion instrumentation without duplicate GA tags.
- [x] Publish initial guides and provide keyword map, 90-day roadmap, owner dependencies.
- [x] Run type checks, regression tests, production build and static route/link/schema validation.
- [x] Attempt browser preview and record verification limits: preview server started, but the browser access host was unavailable. Desktop/mobile visual and interactive QA remain outstanding.

No deployment, external account edits, directory submissions or outreach are included in this local implementation. Rankings, lead increases and AI citations are outcomes to measure after release.

Implementation results and file inventory: `SEO-IMPLEMENTATION-REPORT.md`. Keyword map and operational follow-up: `SEO-GROWTH-ROADMAP.md`.
