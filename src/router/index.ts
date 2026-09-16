import { createRouter, createWebHistory } from 'vue-router'
import { linkosysRoutes } from '@/router/linkosys'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ...allRoutes,
    ...linkosysRoutes
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Nếu user bấm nút back/forward
      return savedPosition
    } else {
      // Luôn cuộn lên đầu trang
      return { top: 0 }
    }
  }
})

// Before each route evaluates...
router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title.toString()
  }
  next()
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next()

  // If auth is required and the user is logged in...
  const useAuth = useAuthStore()
  if (useAuth.isAuthenticated()) {
    return next()
  }

  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  redirectToLogin()

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ name: 'auth.sign-in', query: { redirectedFrom: routeTo.fullPath } })
  }
})
export default router
