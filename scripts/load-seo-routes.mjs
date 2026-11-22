/**
 * Compiles src/content/seo-routes.ts and returns its real values.
 *
 * The SEO list is TypeScript so the app can type it; the build scripts need the
 * same values in Node. esbuild is already present as a Vite dependency, so this
 * avoids both a second copy of the data and a regex parse of the source.
 */
import { build } from 'esbuild'
import { mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export async function loadSeoRoutes() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const tmp = join(root, 'node_modules/.cache/seo-routes.mjs')

  mkdirSync(dirname(tmp), { recursive: true })
  await build({
    entryPoints: [join(root, 'src/content/seo-routes.ts')],
    outfile: tmp,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent'
  })

  const mod = await import(`${pathToFileURL(tmp).href}?t=${Date.now()}`)
  rmSync(tmp, { force: true })

  if (!Array.isArray(mod.seoRoutes) || mod.seoRoutes.length === 0) {
    throw new Error('seo-routes.ts produced no routes')
  }

  return { routes: mod.seoRoutes, siteUrl: mod.SITE_URL, siteName: mod.SITE_NAME, buildPageGraph: mod.buildPageGraph, root }
}
