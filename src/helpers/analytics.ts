declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Reports one GA4 page_view per resolved route.
 *
 * The tag is configured with send_page_view: false in index.html, so Google
 * does not count the landing page on its own. It cannot count the rest: this is
 * a single-page app, and every link after the first is a client-side navigation
 * with no document load behind it, so the automatic page_view would report one
 * view per session however many pages someone read. Sending it from the router
 * makes one code path responsible for all of them, the first included.
 *
 * Calls are queued on window.dataLayer by the shim in index.html, so this is
 * safe before the tag has downloaded, and inert where the tag never loads at
 * all — locally and on preview deployments.
 */
export function trackPageView() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title
  })
}
