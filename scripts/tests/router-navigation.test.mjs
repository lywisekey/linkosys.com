import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

test('detail navigation refreshes SEO and validates every slug', async () => {
  const server = await createServer({
    // Exercise real routes and guards; component rendering is covered by the full build.
    configFile: false,
    plugins: [
      {
        name: 'route-test-components',
        enforce: 'pre',
        load(id) {
          if (id.endsWith('.vue')) return 'export default {}'
        }
      }
    ],
    resolve: { alias: { '@': fileURLToPath(new URL('../../src', import.meta.url)) } },
    server: { middlewareMode: true, watch: null, hmr: false, ws: false },
    optimizeDeps: { noDiscovery: true, entries: [] },
    appType: 'custom',
    logLevel: 'error',
    ssr: { noExternal: false }
  })
  try {
    const { default: router } = await server.ssrLoadModule('/src/router/index.ts')
    const { seoRouteByPath } = await server.ssrLoadModule('/src/content/seo-routes.ts')
    const { seoRoutes } = await server.ssrLoadModule('/src/content/seo-routes.ts')
    for (const { path } of seoRoutes) {
      await router.push(path)
      assert.equal(router.currentRoute.value.meta.title, seoRouteByPath(path).title)
      assert.equal(router.currentRoute.value.meta.description, seoRouteByPath(path).description)
    }
    for (const path of [
      '/services/does-not-exist',
      '/industries/does-not-exist',
      '/company/blog/does-not-exist'
    ]) {
      await router.push(path)
      assert.equal(router.currentRoute.value.name, 'not-found')
      assert.equal(router.currentRoute.value.meta.noindex, true)
    }
    const hosting = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'))
    const { linkosysRoutes } = await server.ssrLoadModule('/src/router/linkosys.ts')
    for (const route of linkosysRoutes.filter((route) => typeof route.redirect === 'string')) {
      assert.ok(
        hosting.redirects.some(
          (rule) =>
            rule.source === route.path && rule.destination === route.redirect && rule.permanent
        )
      )
      await router.push(route.path)
      assert.equal(router.currentRoute.value.path, route.redirect)
    }
    await router.push('/services/ai-and-data')
    assert.equal(
      router.currentRoute.value.meta.title,
      seoRouteByPath('/services/ai-and-data').title
    )
  } finally {
    await server.close()
  }
})
