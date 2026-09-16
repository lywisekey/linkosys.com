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
 * Runs automatically from `npm run build`.
 */
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

function renderRoute(template, route, siteUrl) {
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`
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

let written = 0

for (const route of seoRoutes) {
  const body = await render(route.path)
  const html = renderRoute(template, route, SITE_URL).replace(
    '<div id="app"></div>',
    `<div id="app">${body}</div>`
  )
  const outDir = route.path === '/' ? dist : join(dist, route.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  written += 1
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

console.log(`prerendered: ${written} routes + SPA fallback`)
