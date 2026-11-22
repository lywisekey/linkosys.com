import type { RouteLocationNormalized } from 'vue-router'
import { SITE_NAME, SITE_URL, seoRoutes, buildPageGraph } from '@/content/seo-routes'

export { SITE_NAME, SITE_URL }

// Single source of truth for the company facts we are confident about. Anything
// not verifiable from the company's own published documents is intentionally
// absent rather than guessed — see docs/CONTENT-VERIFICATION.md.
export const ORG = {
  legalName: 'Linkosys Inc.',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  description:
    'Linkosys is a U.S. technology consulting and engineering firm delivering software development, data and AI, cloud, cybersecurity, program management, and technology staffing for government and enterprise organizations.'
}

type MetaTag = { key: string; attr: 'name' | 'property'; content: string }

function upsertMeta({ key, attr, content }: MetaTag) {
  if (!content) return
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Replaces the managed JSON-LD block. Static blocks in index.html are untouched. */
function setJsonLd(blocks: object[]) {
  const id = 'lk-jsonld'
  document.getElementById(id)?.remove()
  if (!blocks.length) return
  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks)
  document.head.appendChild(script)
}

/**
 * Applies title, description, canonical, Open Graph, Twitter and JSON-LD for a
 * route. Called from a router afterEach hook so every page gets unique metadata
 * instead of the single static title the site shipped with.
 */
export function applySeo(route: RouteLocationNormalized) {
  // During prerendering the head is written by scripts/prerender-html.mjs from
  // the same seo-routes list, so there is nothing to do and no document to do
  // it to.
  if (typeof document === 'undefined') return

  const meta = route.meta as {
    title?: string
    description?: string
    ogImage?: string
    noindex?: boolean
    jsonLd?: object | object[]
  }

  const title = meta.title ?? `${SITE_NAME} | Technology Consulting and Engineering`
  const description = meta.description ?? ORG.description
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`
  const image = `${SITE_URL}${meta.ogImage ?? '/images/og-default.png'}`

  document.title = title

  upsertMeta({ key: 'description', attr: 'name', content: description })
  upsertMeta({
    key: 'robots',
    attr: 'name',
    content: meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  })

  upsertMeta({
    key: 'og:type',
    attr: 'property',
    content:
      (meta.jsonLd as Record<string, unknown>)?.['@type'] === 'Article' ? 'article' : 'website'
  })
  upsertMeta({ key: 'og:site_name', attr: 'property', content: SITE_NAME })
  upsertMeta({ key: 'og:title', attr: 'property', content: title })
  upsertMeta({ key: 'og:description', attr: 'property', content: description })
  upsertMeta({ key: 'og:url', attr: 'property', content: canonical })
  upsertMeta({ key: 'og:image', attr: 'property', content: image })
  upsertMeta({ key: 'og:image:secure_url', attr: 'property', content: image })
  upsertMeta({ key: 'og:image:alt', attr: 'property', content: `${title} — Linkosys` })

  upsertMeta({ key: 'twitter:card', attr: 'name', content: 'summary_large_image' })
  upsertMeta({ key: 'twitter:title', attr: 'name', content: title })
  upsertMeta({ key: 'twitter:description', attr: 'name', content: description })
  upsertMeta({ key: 'twitter:image', attr: 'name', content: image })

  upsertLink('canonical', canonical)

  if (meta.noindex) {
    document.head.querySelector('link[rel="canonical"]')?.remove()
    document.head.querySelector('meta[property="og:url"]')?.remove()
    setJsonLd([])
    return
  }
  setJsonLd(
    buildPageGraph(
      {
        path: route.path.replace(/\/+$/, '') || '/',
        title,
        description,
        jsonLd: meta.jsonLd as object | undefined
      },
      seoRoutes,
      SITE_URL
    )
  )
}
