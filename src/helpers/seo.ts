import type { RouteLocationNormalized } from 'vue-router'

export const SITE_URL = 'https://linkosys.com'
export const SITE_NAME = 'Linkosys'

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

function breadcrumbLd(route: RouteLocationNormalized, title: string) {
  const segments = route.path.split('/').filter(Boolean)
  if (!segments.length) return null

  const items = [{ name: 'Home', item: SITE_URL }]
  let path = ''
  segments.forEach((segment, index) => {
    path += `/${segment}`
    items.push({
      name:
        index === segments.length - 1
          ? title
          : segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `${SITE_URL}${path}`
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  }
}

/**
 * Applies title, description, canonical, Open Graph, Twitter and JSON-LD for a
 * route. Called from a router afterEach hook so every page gets unique metadata
 * instead of the single static title the site shipped with.
 */
export function applySeo(route: RouteLocationNormalized) {
  const meta = route.meta as {
    title?: string
    description?: string
    ogImage?: string
    noindex?: boolean
    jsonLd?: object | object[]
  }

  const title = meta.title ?? `${SITE_NAME} | Technology Consulting and Engineering`
  const description = meta.description ?? ORG.description
  const canonical = `${SITE_URL}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`
  const image = `${SITE_URL}${meta.ogImage ?? '/images/og-default.png'}`

  document.title = title

  upsertMeta({ key: 'description', attr: 'name', content: description })
  upsertMeta({
    key: 'robots',
    attr: 'name',
    content: meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  })

  upsertMeta({ key: 'og:type', attr: 'property', content: 'website' })
  upsertMeta({ key: 'og:site_name', attr: 'property', content: SITE_NAME })
  upsertMeta({ key: 'og:title', attr: 'property', content: title })
  upsertMeta({ key: 'og:description', attr: 'property', content: description })
  upsertMeta({ key: 'og:url', attr: 'property', content: canonical })
  upsertMeta({ key: 'og:image', attr: 'property', content: image })

  upsertMeta({ key: 'twitter:card', attr: 'name', content: 'summary_large_image' })
  upsertMeta({ key: 'twitter:title', attr: 'name', content: title })
  upsertMeta({ key: 'twitter:description', attr: 'name', content: description })
  upsertMeta({ key: 'twitter:image', attr: 'name', content: image })

  upsertLink('canonical', canonical)

  // The Organization node is declared once, statically, in index.html. Route
  // blocks reference it by @id instead of redeclaring it on every navigation.
  const extra = meta.jsonLd ? (Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]) : []
  const crumbs = breadcrumbLd(route, title)
  setJsonLd([...(crumbs ? [crumbs] : []), ...extra])
}
