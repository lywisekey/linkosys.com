import { renderToString } from 'vue/server-renderer'
import { createLinkosysApp } from './create-app'

/**
 * Renders one route to HTML for the build-time prerender step.
 *
 * The router is a module singleton shared by several components, so it is
 * pushed per call rather than recreated. That is safe here because prerendering
 * runs sequentially at build time, not concurrently per request.
 */
export async function render(url: string): Promise<string> {
  const { app, router } = createLinkosysApp()
  await router.push(url)
  await router.isReady()
  return renderToString(app)
}
