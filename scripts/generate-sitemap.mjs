/**
 * Generates public/sitemap.xml from src/content/seo-routes.ts — the same list the
 * router and the prerender step use, so a new page cannot ship missing from one
 * of the three.
 *
 * Runs automatically before `npm run build`.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadSeoRoutes } from './load-seo-routes.mjs'

const { routes, siteUrl, root } = await loadSeoRoutes()

const indexable = routes.filter((route) => !route.noindex)
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq ?? 'yearly'}</changefreq>
    <priority>${route.priority ?? '0.5'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml: ${indexable.length} URLs`)
