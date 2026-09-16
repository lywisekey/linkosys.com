import { services } from './services'
import { industries } from './industries'

export const SITE_URL = 'https://linkosys.com'
export const SITE_NAME = 'Linkosys'

export type SeoRoute = {
  path: string
  title: string
  description: string
  /** Extra structured data merged into the page's JSON-LD block. */
  jsonLd?: object
  noindex?: boolean
  /** Share image path, relative to the site root. Falls back to og-default.png. */
  ogImage?: string
  /** Sitemap hints; omitted entries are left out of the sitemap. */
  priority?: string
  changefreq?: string
}

/**
 * Every indexable route with its own title, description and structured data.
 *
 * This is the single source: the router reads it for client-side head updates,
 * scripts/prerender-html.mjs bakes it into per-route HTML at build time, and
 * scripts/generate-sitemap.mjs enumerates it. Keeping one list is what stops the
 * three drifting apart.
 */
const serviceLd = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: name,
  provider: { '@id': `${SITE_URL}/#organization` },
  url: `${SITE_URL}${path}`
})

const title = (value: string) => `${value} | ${SITE_NAME}`

export const seoRoutes: SeoRoute[] = [
  {
    path: '/',
    title: 'Linkosys | Enterprise & Government Technology Consulting',
    description:
      'Linkosys delivers software engineering, AI and data, cloud, cybersecurity, IT staffing and program management for U.S. government and enterprise organizations. GSA Schedule 47QTCA21D004X.',
    priority: '1.0',
    changefreq: 'monthly'
  },
  {
    path: '/services',
    title: title('Technology Services'),
    ogImage: '/images/og-services.png',
    description:
      'Software development, AI and data, cloud and infrastructure, cybersecurity, IT staffing and program management services for government and enterprise organizations.',
    priority: '0.9',
    changefreq: 'monthly'
  },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    title: service.seoTitle,
    description: service.seoDescription,
    jsonLd: serviceLd(service.name, service.summary, `/services/${service.slug}`),
    ogImage: '/images/og-services.png',
    priority: '0.8'
  })),
  {
    path: '/government',
    title: 'Government IT Services & Consulting | Linkosys',
    description:
      'Software engineering, data, cloud, cybersecurity, IT staffing and program management for government agencies and prime contractors. GSA Multiple Award Schedule 47QTCA21D004X.',
    jsonLd: serviceLd(
      'Government IT Services',
      'Technology consulting, software engineering, cybersecurity and staffing services for government organizations and government contractors.',
      '/government'
    ),
    ogImage: '/images/og-government.png',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/solutions',
    title: title('Solutions'),
    description:
      'Legacy modernization, process automation, connected data, digital products, manufacturing modernization and secure delivery — business outcomes Linkosys is brought in to deliver.',
    priority: '0.8'
  },
  {
    path: '/industries',
    title: title('Industries'),
    description:
      'Linkosys works across government, manufacturing, healthcare, transportation, financial services and enterprise organizations.',
    priority: '0.7'
  },
  // Government has its own page; /industries/government redirects to it.
  ...industries
    .filter((industry) => industry.slug !== 'government')
    .map((industry) => ({
      path: `/industries/${industry.slug}`,
      title: industry.seoTitle,
      description: industry.seoDescription,
      ogImage:
        industry.slug === 'manufacturing'
          ? '/images/og-manufacturing.png'
          : '/images/og-default.png',
      priority: '0.7'
    })),
  {
    path: '/case-studies',
    title: title('Case Studies'),
    description:
      'Delivered work described by the problem it solved: challenge, approach, solution and technology across manufacturing, operations, applied AI and public sector engagements.',
    priority: '0.7'
  },
  {
    path: '/projects',
    title: title('Our Work'),
    description:
      'Selected software, data and systems work delivered by the Linkosys engineering team across operations platforms, applied AI, public services and commercial platforms.',
    priority: '0.6'
  },
  {
    path: '/company/aboutus',
    title: 'About Linkosys | U.S. Technology Consulting Firm',
    description:
      'Linkosys Inc. is a California-incorporated technology consulting and engineering firm serving government and enterprise organizations across the United States.',
    priority: '0.7'
  },
  {
    path: '/company/team',
    title: title('Leadership and Team'),
    description:
      'The engineers, delivery leads and consultants who staff Linkosys engagements across government, manufacturing and enterprise clients.',
    priority: '0.5'
  },
  {
    path: '/company/partners',
    title: title('Partners and Clients'),
    description:
      'Technology partners and client organizations Linkosys works with across government, manufacturing, financial services, media and commercial sectors.',
    priority: '0.5'
  },
  {
    path: '/company/blog',
    title: title('Insights'),
    description:
      'Notes from the Linkosys engineering and delivery team on modernization, data, security and getting technology programs delivered.',
    priority: '0.4'
  },
  {
    path: '/contact',
    title: 'Contact Linkosys | Talk to an Expert',
    description:
      'Talk to a Linkosys expert about software engineering, data and AI, cloud, cybersecurity, technology staffing or a government requirement.',
    priority: '0.9'
  }
]

export const seoRouteByPath = (path: string) =>
  seoRoutes.find((route) => route.path === path.replace(/\/+$/, '') || route.path === path)
