/**
 * Generates public/llms.txt from src/content/seo-routes.ts — the same list the
 * router, the prerender step and the sitemap use, so the file cannot drift from
 * what the site actually publishes.
 *
 * Format per https://llmstxt.org: one H1, an optional blockquote summary, then
 * H2 sections of links with a short note each. Every line here is derived from
 * copy already on the site; nothing is written only for this file.
 *
 * It has to be a real file in public/ rather than a route: Vercel resolves the
 * filesystem before rewrites, so anything not on disk falls through to the SPA
 * fallback and is served as HTML with a 200. An llms.txt audit reading that
 * fallback reports a missing H1, which is exactly what happened before this
 * existed.
 *
 * Runs automatically before `npm run build`.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadSeoRoutes } from './load-seo-routes.mjs'

const { routes, siteUrl, siteName, root } = await loadSeoRoutes()

/** Section order is the order a reader should meet the site in. */
const SECTIONS = [
  ['Services', (path) => path === '/services' || path.startsWith('/services/')],
  ['Government', (path) => path === '/government'],
  ['Solutions', (path) => path === '/solutions'],
  ['Industries', (path) => path === '/industries' || path.startsWith('/industries/')],
  ['Work', (path) => path === '/case-studies' || path === '/projects'],
  ['Company', (path) => path.startsWith('/company/')],
  ['Contact', (path) => path === '/contact']
]

/**
 * Titles are written for search results, so they carry the site name and often
 * a second descriptive clause after a pipe. Neither belongs in a link list: the
 * heading already says whose site this is, and the note after the link already
 * carries the description.
 */
const cleanTitle = (title) =>
  title
    .replace(new RegExp(`\\s*\\|\\s*${siteName}\\s*$`), '')
    .replace(new RegExp(`^${siteName}\\s*\\|\\s*`), '')
    .split(' | ')[0]
    .trim()

const home = routes.find((route) => route.path === '/')
if (!home) throw new Error('llms.txt: no route for /')

const indexable = routes.filter((route) => !route.noindex && route.path !== '/')

const lines = [`# ${siteName}`, '', `> ${home.description}`, '']

for (const [heading, matches] of SECTIONS) {
  const section = indexable.filter((route) => matches(route.path))
  if (!section.length) continue
  lines.push(`## ${heading}`, '')
  for (const route of section) {
    lines.push(`- [${cleanTitle(route.title)}](${siteUrl}${route.path}): ${route.description}`)
  }
  lines.push('')
}

const placed = new Set(
  SECTIONS.flatMap(([, matches]) => indexable.filter((r) => matches(r.path)).map((r) => r.path))
)
const missed = indexable.filter((route) => !placed.has(route.path))
if (missed.length) {
  // A new route with an unrecognised prefix would otherwise vanish silently.
  lines.push('## Other', '')
  for (const route of missed) {
    lines.push(`- [${cleanTitle(route.title)}](${siteUrl}${route.path}): ${route.description}`)
  }
  lines.push('')
}

writeFileSync(join(root, 'public/llms.txt'), lines.join('\n'))
console.log(`llms.txt: ${indexable.length} links`)
