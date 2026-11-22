type Page = { path: string; title: string; description: string; jsonLd?: object }

/** Identical graphs in initial HTML and after client navigation. */
export function buildPageGraph(page: Page, pages: Page[], siteUrl: string): object[] {
  const url = `${siteUrl}${page.path}`
  const service =
    page.jsonLd && (page.jsonLd as Record<string, unknown>)['@type'] === 'Service'
      ? { ...page.jsonLd, '@id': `${url}#service` }
      : null
  const article =
    page.jsonLd && (page.jsonLd as Record<string, unknown>)['@type'] === 'Article'
      ? (page.jsonLd as Record<string, unknown>)
      : null
  const parent = page.path.startsWith('/services/')
    ? pages.find((p) => p.path === '/services')
    : page.path.startsWith('/industries/')
      ? pages.find((p) => p.path === '/industries')
      : page.path.startsWith('/company/blog/')
        ? pages.find((p) => p.path === '/company/blog')
        : null
  const crumbs =
    page.path === '/'
      ? []
      : [
          { name: 'Home', item: `${siteUrl}/` },
          ...(parent
            ? [{ name: parent.title.split(' | ')[0], item: `${siteUrl}${parent.path}` }]
            : []),
          { name: page.title.split(' | ')[0], item: url }
        ]
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      ...(service
        ? { mainEntity: { '@id': `${url}#service` } }
        : article
          ? { mainEntity: { '@id': article['@id'] } }
          : {}),
      ...(crumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {})
    },
    ...(crumbs.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: crumbs.map((entry, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              ...entry
            }))
          }
        ]
      : []),
    ...(service ? [service] : page.jsonLd ? [page.jsonLd] : [])
  ]
}
