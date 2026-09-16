/**
 * Prerenders every route to static HTML after the Vite build.
 *
 * The app is a client-rendered SPA, so every URL was served the same index.html.
 * That meant every page carried `canonical: https://linkosys.com/` — telling
 * search engines the whole site duplicates the homepage — and link unfurlers in
 * Slack, LinkedIn and Teams, which do not run JavaScript, showed the homepage
 * title for every shared URL.
 *
 * This writes dist/<route>/index.html with the page's real markup rendered by
 * vue/server-renderer, plus the correct title, description, canonical, Open
 * Graph, Twitter and JSON-LD. Crawlers and link unfurlers now receive the
 * content itself rather than an empty <div id="app">, and the first paint no
 * longer waits on the JavaScript bundle.
 *
 * Vercel checks the filesystem before applying the SPA rewrite in vercel.json,
 * so these files win for exact paths and the rewrite still handles everything
 * else. The app hydrates over the markup and applySeo() keeps the head right on
 * client-side navigation.
 *
 * It also inlines the critical CSS for each page and defers the rest. The
 * stylesheet is ~450KB of mostly unused Bootstrap and was render-blocking:
 * Lighthouse attributed 3,538ms of the 4.4s mobile LCP to render delay, with
 * load delay and load time both at zero. The markup was already there; the
 * browser was waiting for permission to paint it.
 *
 * Runs automatically from `npm run build`.
 */
import Beasties from 'beasties'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadSeoRoutes } from './load-seo-routes.mjs'

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Replaces a tag's content attribute, or reports the template drifted. */
function replaceMeta(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find ${label} in dist/index.html`)
  }
  return html.replace(pattern, replacement)
}

/**
 * Moves the app bundle off the critical path.
 *
 * Every route is prerendered and every internal link is a real <a href>, so the
 * page is readable and navigable before Vue boots — a click before hydration is
 * a normal document navigation to another prerendered page. Letting the module
 * download at default priority cost 1.25s of LCP by competing with the fonts and
 * stylesheet for bandwidth; deferring it to the load event gives the paint the
 * bandwidth first.
 */
function deferBundle(html) {
  const script = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)
  if (!script) throw new Error('prerender: module script tag not found')

  const loader =
    `<script>addEventListener('load',function(){var s=document.createElement('script');` +
    `s.type='module';s.crossOrigin='anonymous';s.src=${JSON.stringify(script[1])};` +
    `document.head.appendChild(s)})</script>`

  return html
    .replace(script[0], loader)
    // Preloading the same modules at high priority would undo the deferral.
    .replace(/<link rel="modulepreload"/g, '<link rel="prefetch" as="script"')
}

function renderRoute(template, route, siteUrl) {
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`
  const image = `${siteUrl}${route.ogImage ?? '/images/og-default.png'}`
  let html = template

  html = replaceMeta(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeText(route.title)}</title>`, 'title')
  html = replaceMeta(
    html,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escapeAttr(route.description)}">`,
    'description'
  )
  html = replaceMeta(
    html,
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    'canonical'
  )
  html = replaceMeta(
    html,
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${escapeAttr(route.title)}">`,
    'og:title'
  )
  html = replaceMeta(
    html,
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${escapeAttr(route.description)}">`,
    'og:description'
  )
  html = replaceMeta(
    html,
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    'og:url'
  )
  html = replaceMeta(
    html,
    /<meta name="robots" content="[^"]*">/,
    `<meta name="robots" content="${route.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">`,
    'robots'
  )

  for (const [pattern, label] of [
    [/<meta property="og:image" content="[^"]*">/, 'og:image'],
    [/<meta property="og:image:secure_url" content="[^"]*">/, 'og:image:secure_url'],
    [/<meta name="twitter:image" content="[^"]*">/, 'twitter:image']
  ]) {
    const tag = pattern.source.includes('twitter')
      ? `<meta name="twitter:image" content="${escapeAttr(image)}">`
      : pattern.source.includes('secure_url')
        ? `<meta property="og:image:secure_url" content="${escapeAttr(image)}">`
        : `<meta property="og:image" content="${escapeAttr(image)}">`
    html = replaceMeta(html, pattern, tag, label)
  }

  html = replaceMeta(
    html,
    /<meta property="og:image:alt" content="[^"]*">/,
    `<meta property="og:image:alt" content="${escapeAttr(`${route.title} — Linkosys`)}">`,
    'og:image:alt'
  )

  html = replaceMeta(
    html,
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}">`,
    'twitter:title'
  )
  html = replaceMeta(
    html,
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}">`,
    'twitter:description'
  )

  if (route.jsonLd) {
    // Carries the id applySeo() manages, so hydration replaces this block
    // instead of adding a second copy of the same Service node. It sits
    // alongside the static Organization node, which it references by @id.
    html = html.replace(
      '</head>',
      `  <script id="lk-jsonld" type="application/ld+json">\n${JSON.stringify(route.jsonLd, null, 2)}\n  </script>\n</head>`
    )
  }

  return html
}

const { routes: seoRoutes, siteUrl: SITE_URL, root } = await loadSeoRoutes()
const dist = join(root, 'dist')
const ssrDir = join(root, 'node_modules/.cache/ssr')

// A separate SSR bundle of the same app, built here so `npm run build` stays a
// single command.
execFileSync(
  'npx',
  ['vite', 'build', '--ssr', 'src/entry-server.ts', '--outDir', ssrDir, '--logLevel', 'error'],
  { cwd: root, stdio: 'inherit' }
)

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')

if (!template.includes('<div id="app"></div>')) {
  throw new Error('prerender: could not find the app mount point in dist/index.html')
}

// pruneSource stays off: the full stylesheet is still needed once the page is
// interactive and for every client-side route change.
const beasties = new Beasties({
  path: dist,
  publicPath: '/',
  preload: 'swap',
  pruneSource: false,
  inlineFonts: false,
  preloadFonts: false,
  // The head carries a hand-written @font-face block. Beasties prunes inline
  // styles by default and drops it, because @font-face has no selector to match
  // against the document.
  reduceInlineStyles: false,
  logLevel: 'silent'
})

let written = 0
let inlined = 0

for (const route of seoRoutes) {
  const body = await render(route.path)
  const html = renderRoute(template, route, SITE_URL).replace(
    '<div id="app"></div>',
    `<div id="app">${body}</div>`
  )
  const critical = deferBundle(await beasties.process(html))
  if (critical.includes('<style>') || critical.includes('<style ')) inlined += 1

  const outDir = route.path === '/' ? dist : join(dist, route.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), critical)
  written += 1
}

if (inlined !== written) {
  throw new Error(`prerender: critical CSS inlined for only ${inlined}/${written} routes`)
}

rmSync(ssrDir, { recursive: true, force: true })

// Anything not matching a known route falls through to the SPA rewrite. Pointing
// that at index.html made every unknown URL claim `canonical: /` and advertise
// itself as indexable, so the fallback gets its own noindex copy with no
// canonical at all.
const fallback = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | Linkosys</title>')
  .replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, nofollow">')
  .replace(/\s*<link rel="canonical" href="[^"]*">/, '')
  .replace(/\s*<meta property="og:url" content="[^"]*">/, '')

writeFileSync(join(dist, 'spa-fallback.html'), fallback)

console.log(`prerendered: ${written} routes + SPA fallback, critical CSS inlined`)
