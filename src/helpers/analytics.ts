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
    page_location: window.location.origin + window.location.pathname,
    page_title: document.title
  })
}

/** Fixed event names and labels only; never send form values or link text. */
export function trackConversion(
  event:
    | 'generate_lead'
    | 'consultation_request'
    | 'business_email_click'
    | 'phone_click'
    | 'cta_click',
  params: Record<string, string> = {}
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, { page_path: window.location.pathname, ...params })
}

let trackingInstalled = false
export function installConversionTracking() {
  if (typeof document === 'undefined' || trackingInstalled) return
  trackingInstalled = true
  // Delegation covers router navigation and newly rendered service cards.
  document.addEventListener(
    'click',
    (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!(link instanceof HTMLAnchorElement)) return
      const href = link.getAttribute('href') ?? ''
      if (href.startsWith('mailto:')) trackConversion('business_email_click')
      else if (href.startsWith('tel:')) trackConversion('phone_click')
      else if (link.origin === window.location.origin) {
        if (link.pathname === '/contact')
          trackConversion('consultation_request', {
            placement: link.closest('main') ? 'content' : 'navigation'
          })
        else if (link.classList.contains('btn'))
          trackConversion('cta_click', { destination: link.pathname })
      }
    },
    { capture: true }
  )
}
