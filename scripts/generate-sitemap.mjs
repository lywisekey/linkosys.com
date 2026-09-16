/**
 * Generates public/sitemap.xml from the same content modules the router uses, so
 * a new service or industry page cannot be added without appearing in the sitemap.
 * Runs automatically before `npm run build`.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const SITE = 'https://linkosys.com'

/** Reads `slug: '...'` values out of a content module without needing a TS build. */
const slugsFrom = (file) => [
  ...readFileSync(resolve(root, file), 'utf8').matchAll(/^\s*slug:\s*'([a-z0-9-]+)'/gm)
].map((match) => match[1])

const serviceSlugs = slugsFrom('src/content/services.ts')
const industrySlugs = slugsFrom('src/content/industries.ts')

if (!serviceSlugs.length || !industrySlugs.length) {
  throw new Error('Sitemap generation found no slugs — check src/content/*.ts')
}

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'monthly' },
  { loc: '/services', priority: '0.9', changefreq: 'monthly' },
  ...serviceSlugs.map((slug) => ({ loc: `/services/${slug}`, priority: '0.8' })),
  { loc: '/government', priority: '0.9', changefreq: 'monthly' },
  { loc: '/solutions', priority: '0.8' },
  { loc: '/industries', priority: '0.7' },
  // /government is the canonical page for that industry; it is already listed.
  ...industrySlugs
    .filter((slug) => slug !== 'government')
    .map((slug) => ({ loc: `/industries/${slug}`, priority: '0.7' })),
  { loc: '/case-studies', priority: '0.7' },
  { loc: '/projects', priority: '0.6' },
  { loc: '/company/aboutus', priority: '0.7' },
  { loc: '/company/team', priority: '0.5' },
  { loc: '/company/partners', priority: '0.5' },
  { loc: '/company/blog', priority: '0.4' },
  { loc: '/contact', priority: '0.9' }
]

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq ?? 'yearly'}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml: ${urls.length} URLs`)
