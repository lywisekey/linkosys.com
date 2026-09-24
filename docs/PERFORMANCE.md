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

Measured against `https://linkosys.com/`, Lighthouse 12.8.2, mobile.

| | Baseline redesign (`6a21868`) | After critical-path work |
|---|---|---|
| Performance | 74 | **98** |
| FCP | 4.1 s | **1.4 s** |
| LCP | 4.4 s | **2.3 s** |
| TBT | 110 ms | **0 ms** |
| CLS | 0 | **0** |

The after column is the consistent figure across three consecutive runs, and it
matches the local measurement (98 / 2.29 s), so the local test server is a fair
proxy for production.

The *first* run after a deploy is not. It measured 87 / LCP 4.0 s / CLS 0.014
against the same build that the next three runs put at 98 / 2.3 s / CLS 0: the
Vercel edge cache was cold and TTFB carried 863 ms of it, with a 3,134 ms render
delay behind it. Discard the first post-deploy run rather than reading it as a
regression.

## Critical path work

Applied after the baseline above, targeting the render delay it identified.

| Metric | Before | After | Change |
|---|---|---|---|
| **Performance** | 77 | **98** | +21 |
| **LCP** | 4.2 s | **2.29 s** | −45% |
| **FCP** | 3.9 s | **1.81 s** | −54% |
| **Speed Index** | 3.9 s | **1.81 s** | −54% |
| **TBT** | 54 ms | **0 ms** | — |

The after figures are the median of **eight** runs, not three. LCP is bimodal
here — eight runs gave 1.97, 2.04, 2.26, 2.26, 2.33, 2.63, 2.63, 2.63 s — so a
three-run sample can land anywhere from 2.0 s to 2.6 s and read as a much
better or worse result than the build actually delivers. Three runs is enough
for a coarse before/after; it is not enough once the numbers are close to a
threshold.

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

What it is *not* safe for is anything that styles itself from JavaScript.
`@fortawesome/fontawesome-svg-core` injects its own stylesheet at runtime, so
`.svg-inline--fa` existed in no stylesheet we build and therefore in no critical
CSS. That was harmless while the bundle ran during the paint; once it moved to
the `load` event, every prerendered icon spent the whole first paint with no
width or height and stretched to fill its parent — the top banner rendered as a
full-screen red block. The rule now lives in `_linkosys.scss`. When adding a
library, check whether it styles itself from JS; if it does, the styles have to
be in the stylesheet or the prerendered markup is unstyled until `load`.

Bundle work done along the way: the mock auth backend was initialised in
`App.vue`, pulling axios and axios-mock-adapter into the chunk every visitor
downloads for pages only the demo auth routes use. Moving it, and registering
`oh-vue-icons` and the toast plugin locally instead of globally, took the main
chunk from 208 KB to 168 KB gzipped. That also surfaced a real bug: the
`<v-icon>` on the sign-up page had been rendering nothing, silently, because
production Vue does not warn about unresolved components.

## Analytics, and how its cost was measured

GA4 was added after the work above. A third party on a page tuned this hard
needs measuring, not assuming, so it was measured twice — once with the tag on
the load event, once waiting for `requestIdleCallback` after it.

Method: Lighthouse against production, mobile, four runs with
`--blocked-url-patterns` for googletagmanager and google-analytics and four
without, **alternated** so both groups met the same network.

| Render delay (LCP element) | Tag blocked | Tag live | Cost |
|---|---|---|---|
| Tag on `load` | 3,237 ms | 4,318 ms | **+1,081 ms** |
| Tag on idle after `load` | 3,266 ms | 3,124 ms | −142 ms |

The LCP element is a paragraph already in the prerendered HTML — load delay and
load time are both zero — so none of that was spent fetching anything. The tag
on `load` was competing with hydration, which starts on the same event, and
pushing back the frame that finished the page. Waiting for idle puts it after
hydration and the cost disappears. TBT still rises by roughly 60–70 ms with the
tag live, which is the tag's own execution and is well inside the 200 ms budget.

**Do not compare these runs by median.** LCP here is bimodal in a way that has
nothing to do with analytics: FCP lands either at ~1.39 s or at ~2.31 s, and the
whole of LCP shifts with it. Both clusters appear with the tag blocked, and FCP
happens long before the tag is even requested, so the split is upstream of it.
With four runs per group the median just reports how many runs fell in which
cluster — measured that way, the second round appeared to show analytics making
the site *faster* by 1.19 s, which is not a thing. The numbers above compare
render delay within the slow cluster only, where every run saw the same TTFB
(~635 ms) and the same FCP (~2.31 s).

## Core Web Vitals status

Thresholds are LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms.

| | Mobile | Desktop |
|---|---|---|
| LCP | **2.29 s** median — good | 0.67 s — good |
| CLS | 0 — good | 0 — good |
| TBT (INP proxy) | 0 ms — good | 0 ms — good |

Both pass, but mobile LCP sits close to the 2.5 s line and individual runs do
cross it. Treat a single run above 2.5 s as noise; treat the median moving above
it as a regression.

## What was holding mobile back — resolved

Kept for the record, because the diagnosis is what made the fix obvious. The
production mobile run at 4.4 s LCP broke down as:

```
TTFB           875 ms
Load Delay       0 ms
Load Time        0 ms
Render Delay  3,538 ms
```

Load delay and load time were zero: the LCP element is text already present in
the prerendered HTML, so nothing was being fetched for it. The page was not slow
because it was heavy — it was waiting for permission to paint.

The three items Lighthouse listed (render-blocking resources 1,730 ms, unused JS
99 KB, unused CSS 64 KB) are addressed above. The one that mattered most was not
on that list: the bundle was not blocking the paint, it was competing with it for
bandwidth. Blocking JS outright was what exposed it.

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
