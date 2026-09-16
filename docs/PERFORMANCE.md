# Performance baseline

Lighthouse measurements taken to track Core Web Vitals across the redesign.
Re-run the commands below after any significant change and append a row.

---

## Redesign: before vs after

Both builds served from the same local server with gzip, so the only variable is
the code. Median of three runs each, Lighthouse 12.8.2, mobile, simulated
throttling.

| Metric | Before (`9bf8b29`) | After (`6a21868`) | Change |
|---|---|---|---|
| **Performance** | 56 | **77** | +21 |
| **LCP** | 11.8 s | **4.2 s** | −65% |
| **FCP** | 5.3 s | **3.9 s** | −27% |
| **Speed Index** | 9.8 s | **3.9 s** | −60% |
| **TBT** | 68 ms | **54 ms** | −22% |
| **CLS** | 0.000 | **0.000** | — |
| Page weight | 46.0 MB | **403 KB** | −99% |

What moved the numbers:

- **LCP** was the 43 MB `bg.mp4` hero video. Lighthouse named the `<video>`
  element as the LCP element on the old build. It is gone; the LCP element is now
  the hero paragraph, which is in the prerendered HTML.
- **Page weight** fell from 46 MB mostly for the same reason, plus deduplicating
  Bootstrap CSS (three copies) and replacing the global icon plugin.
- **FCP and Speed Index** improved because the HTML now arrives with content
  instead of an empty `<div id="app">`.

## Production, as deployed

Measured against `https://linkosys.com/`, Lighthouse 12.8.2, single run.

| | Mobile | Desktop |
|---|---|---|
| Performance | **74** | **96** |
| FCP | 4.1 s | 1.1 s |
| LCP | 4.4 s | 1.1 s |
| TBT | 110 ms | 0 ms |
| CLS | 0 | 0 |
| Transferred | 398 KB | 400 KB |

Production mobile (74) corroborates the local after-build measurement (77); the
small gap is normal run-to-run variance plus real network latency.

## Critical path work

Applied after the baseline above, targeting the render delay it identified.

| Metric | Before | After | Change |
|---|---|---|---|
| **Performance** | 77 | **99** | +22 |
| **LCP** | 4.2 s | **1.96 s** | −53% |
| **FCP** | 3.9 s | **1.21 s** | −69% |
| **Speed Index** | 3.9 s | **1.38 s** | −65% |
| **TBT** | 54 ms | **0 ms** | — |

Three changes, in the order they were found to matter:

1. **Self-hosted fonts.** The Google Fonts stylesheet plus a second host sat on
   the critical path. The woff2 files are served from `/fonts`, the `@font-face`
   rules are inlined in the head — not in the deferred stylesheet, or the first
   paint has no font to use — and the two faces the first screen needs are
   preloaded.
2. **Critical CSS inlined.** `beasties` extracts the above-the-fold rules per
   prerendered route and defers the rest behind `rel=preload`+`onload`, with a
   `<noscript>` fallback. Render-blocking resources went to zero.
3. **The app bundle moved off the critical path.** This was the large one. With
   JS blocked entirely, LCP measured 2.78 s against 4.35 s with it — the bundle
   was costing 1.5 s by competing for bandwidth during the paint, not by
   blocking. It now loads on the `load` event, and `modulepreload` is downgraded
   to `prefetch` so it does not re-enter the race.

Deferring hydration is safe here specifically because every route is
prerendered and every internal link is a real `<a href>`: a click before Vue
boots is an ordinary navigation to another prerendered page.

Bundle work done along the way: the mock auth backend was initialised in
`App.vue`, pulling axios and axios-mock-adapter into the chunk every visitor
downloads for pages only the demo auth routes use. Moving it, and registering
`oh-vue-icons` and the toast plugin locally instead of globally, took the main
chunk from 208 KB to 168 KB gzipped. That also surfaced a real bug: the
`<v-icon>` on the sign-up page had been rendering nothing, silently, because
production Vue does not warn about unresolved components.

## Core Web Vitals status

Thresholds are LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms.

| | Mobile | Desktop |
|---|---|---|
| LCP | **1.96 s** — good | good |
| CLS | 0 — good | 0 — good |
| TBT (INP proxy) | 0 ms — good | 0 ms — good |

Both pass. Re-measure against production after deploying; the figures above are
from the local gzipped server, which matched production to within a few points
on the previous round.

## What is holding mobile back

From the production mobile run:

| Opportunity | Estimated saving |
|---|---|
| Eliminate render-blocking resources | 1,730 ms |
| Reduce unused JavaScript | 99 KB |
| Reduce unused CSS | 64 KB |

The LCP breakdown shows where the time actually goes:

```
TTFB           875 ms
Load Delay       0 ms
Load Time        0 ms
Render Delay  3,538 ms   <-- the whole problem
```

Load Delay and Load Time are zero because the LCP element is text already present
in the HTML. Almost all of the 4.4 s is **render delay**: the browser has the
markup but cannot paint until the render-blocking stylesheet and the Google Fonts
request resolve.

So the remaining work is not about making the page smaller. It is about not
blocking the first paint:

1. **Inline critical CSS** and load the rest asynchronously. The stylesheet is
   ~450 KB uncompressed and mostly unused Bootstrap; the above-the-fold rules are
   a small fraction of it.
2. **Self-host the two fonts** with `font-display: swap` and preload the weights
   the hero uses, removing a third-party round trip from the critical path.
3. **Trim unused Bootstrap** at build time, which shrinks whatever CSS remains
   blocking.

Together these target the 1,730 ms render-blocking estimate, which is what stands
between 4.4 s and the 2.5 s threshold.

---

## How to reproduce

```bash
# Production, as users get it
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npx lighthouse@12 https://linkosys.com/ \
  --only-categories=performance --form-factor=mobile --screenEmulation.mobile \
  --output=html --output-path=/tmp/lh.html
```

To compare two commits, build each into its own `dist`, serve both over a server
that gzips (an uncompressed server inflates every timing and is not comparable to
production), and run Lighthouse against each three times. Take the median:
single runs vary by several points.

One measurement in this round was taken without compression before that was
noticed — it reported Performance 56 for a build that measures 77 gzipped. If a
number looks far off, check the transfer size first.
