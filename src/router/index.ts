import { createRouter, createWebHistory } from 'vue-router'
import { linkosysRoutes } from '@/router/linkosys'
import { useAuthStore } from '@/stores/auth'
import { applySeo } from '@/helpers/seo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...linkosysRoutes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Anchor links inside a page (for example /government#partnerships).
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach((routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  if (!authRequired) return next()

  const useAuth = useAuthStore()
  if (useAuth.isAuthenticated()) return next()

  next({ name: 'auth.sign-in', query: { redirectedFrom: routeTo.fullPath } })
})

// Title, description, canonical, Open Graph and JSON-LD are applied after the
// route resolves so per-route beforeEnter hooks can populate meta first.
router.afterEach((to) => {
  applySeo(to)
})

export default router
