import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { linkosysRoutes } from '@/router/linkosys'
import { applySeo } from '@/helpers/seo'
import { trackPageView } from '@/helpers/analytics'

const router = createRouter({
  // Prerendering runs this module in Node, where there is no browser history.
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: [...linkosysRoutes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Anchor links inside a page (for example /government#partnerships).
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  }
})

// Title, description, canonical, Open Graph and JSON-LD are applied after the
// route resolves so per-route beforeEnter hooks can populate meta first.
router.afterEach((to) => {
  applySeo(to)
  // After applySeo, so the view is reported against the title this route set
  // rather than the one the previous route left behind.
  trackPageView()
})

export default router
