import type { RouteRecordRaw } from 'vue-router'
import { services } from '@/content/services'
import { industries } from '@/content/industries'
import { SITE_URL } from '@/helpers/seo'

const SUFFIX = 'Linkosys'

const title = (value: string) => `${value} | ${SUFFIX}`

/** Service offering markup helps search engines associate a page with a service. */
const serviceLd = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: name,
  provider: { '@id': `${SITE_URL}/#organization` },
  url: `${SITE_URL}${path}`
})

const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'homepage',
    meta: {
      title: 'Linkosys | Technology Consulting and Engineering for Government and Enterprise',
      description:
        'Linkosys delivers software engineering, AI and data, cloud, cybersecurity, IT staffing and program management for U.S. government and enterprise organizations. GSA Schedule 47QTCA21D004X.'
    },
    component: () => import('@/views/Linkosys/homepage.vue')
  },
  {
    path: '/services',
    name: 'services',
    meta: {
      title: title('Technology Services'),
      description:
        'Software development, AI and data, cloud and infrastructure, cybersecurity, IT staffing and program management services for government and enterprise organizations.'
    },
    component: () => import('@/views/Linkosys/ServicesIndex.vue')
  },
  {
    path: '/solutions',
    name: 'solutions',
    meta: {
      title: title('Solutions'),
      description:
        'Legacy modernization, process automation, connected data, digital products, manufacturing modernization and secure delivery — business outcomes Linkosys is brought in to deliver.'
    },
    component: () => import('@/views/Linkosys/SolutionsPage.vue')
  },
  {
    path: '/industries',
    name: 'industries',
    meta: {
      title: title('Industries'),
      description:
        'Linkosys works across government, manufacturing, healthcare, transportation, financial services and enterprise organizations.'
    },
    component: () => import('@/views/Linkosys/IndustriesPage.vue')
  },
  {
    path: '/government',
    name: 'government',
    meta: {
      title: 'Government IT Services and Technology Consulting | Linkosys',
      description:
        'Software engineering, data, cloud, cybersecurity, IT staffing and program management for government agencies and prime contractors. GSA Multiple Award Schedule 47QTCA21D004X.',
      jsonLd: serviceLd(
        'Government IT Services',
        'Technology consulting, software engineering, cybersecurity and staffing services for government organizations and government contractors.',
        '/government'
      )
    },
    component: () => import('@/views/Linkosys/GovernmentPage.vue')
  },
  {
    path: '/case-studies',
    name: 'case-studies',
    meta: {
      title: title('Case Studies'),
      description:
        'Structured case studies covering the challenge, approach, technology and results of Linkosys engagements.'
    },
    component: () => import('@/views/Linkosys/CaseStudiesPage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      title: 'Contact Linkosys | Talk to an Expert',
      description:
        'Talk to a Linkosys expert about software engineering, data and AI, cloud, cybersecurity, technology staffing or a government requirement.'
    },
    component: () => import('@/views/Linkosys/contact.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    meta: {
      title: title('Our Work'),
      description:
        'Selected software, mobile, data and systems work delivered by the Linkosys engineering team across web applications, operations platforms and integrations.'
    },
    component: () => import('@/views/Linkosys/projects.vue')
  },
  {
    path: '/commingsoon',
    name: 'commingsoon',
    meta: { title: title('Coming Soon'), noindex: true },
    component: () => import('@/views/Linkosys/commingsoon.vue')
  }
]

/** One template renders all six service pages from content. */
const serviceDetailRoute: RouteRecordRaw = {
  path: '/services/:slug',
  name: 'services.detail',
  meta: { title: title('Services') },
  component: () => import('@/views/Linkosys/ServiceDetail.vue'),
  beforeEnter: (to) => {
    const service = services.find((entry) => entry.slug === to.params.slug)
    if (!service) return { name: 'not-found', params: { pathMatch: ['services', String(to.params.slug)] } }

    to.meta.title = service.seoTitle
    to.meta.description = service.seoDescription
    to.meta.jsonLd = serviceLd(service.name, service.summary, `/services/${service.slug}`)
    return true
  }
}

const industryDetailRoute: RouteRecordRaw = {
  path: '/industries/:slug',
  name: 'industry.detail',
  meta: { title: title('Industries') },
  component: () => import('@/views/Linkosys/IndustryDetail.vue'),
  beforeEnter: (to) => {
    const industry = industries.find((entry) => entry.slug === to.params.slug)
    if (!industry) return { name: 'not-found', params: { pathMatch: ['industries', String(to.params.slug)] } }

    to.meta.title = industry.seoTitle
    to.meta.description = industry.seoDescription
    return true
  }
}

/**
 * The old service URLs are indexed and linked from elsewhere. They redirect into
 * the new structure rather than 404ing, so no inbound link or ranking is lost.
 */
const legacyRedirects: RouteRecordRaw[] = [
  { path: '/services/custom-development', redirect: '/services/software-development' },
  { path: '/services/web-development', redirect: '/services/software-development' },
  { path: '/services/mobile-development', redirect: '/services/software-development' },
  { path: '/services/blockchain', redirect: '/services/software-development' },
  { path: '/services/ai', redirect: '/services/ai-and-data' },
  { path: '/services/data', redirect: '/services/ai-and-data' },
  { path: '/manufacturing', redirect: '/industries/manufacturing' },
  { path: '/industries/government', redirect: '/government' }
]

const companyRoutes: RouteRecordRaw[] = [
  {
    path: '/company/aboutus',
    name: 'company.aboutus',
    meta: {
      title: 'About Linkosys | U.S. Technology Consulting Firm',
      description:
        'Linkosys Inc. is a California-incorporated technology consulting and engineering firm serving government and enterprise organizations across the United States.'
    },
    component: () => import('@/views/Linkosys/aboutus.vue')
  },
  {
    path: '/company/team',
    name: 'company.team',
    meta: {
      title: title('Leadership and Team'),
      description:
        'The engineers, delivery leads and consultants who staff Linkosys engagements across government, manufacturing and enterprise clients.'
    },
    component: () => import('@/views/Linkosys/team.vue')
  },
  {
    path: '/company/partners',
    name: 'company.partners',
    meta: {
      title: title('Partners and Clients'),
      description:
        'Technology partners and client organizations Linkosys works with across government, manufacturing, legal, retail and commercial sectors.'
    },
    component: () => import('@/views/Linkosys/partners.vue')
  },
  {
    path: '/company/blog',
    name: 'company.blog',
    meta: {
      title: title('Insights'),
      description: 'Notes and perspective from the Linkosys engineering and delivery team.'
    },
    component: () => import('@/views/Linkosys/blog.vue')
  }
]

// Retained so existing links keep working, but kept out of the index: there is no
// customer portal behind them.
const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth/sign-in',
    name: 'auth.sign-in',
    meta: { title: title('Sign In'), noindex: true },
    component: () => import('@/views/pages/auth/SignIn/index.vue')
  },
  {
    path: '/auth/sign-up',
    name: 'auth.sign-up',
    meta: { title: title('Sign Up'), noindex: true },
    component: () => import('@/views/pages/auth/SignUp/index.vue')
  },
  {
    path: '/auth/forgot-password',
    name: 'auth.forgot-password',
    meta: { title: title('Forgot Password'), noindex: true },
    component: () => import('@/views/pages/auth/ForgotPassword/index.vue')
  }
]

const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  meta: {
    title: 'Page Not Found | Linkosys',
    description: 'The page you requested could not be found.',
    noindex: true
  },
  component: () => import('@/views/Linkosys/NotFound.vue')
}

export const linkosysRoutes: RouteRecordRaw[] = [
  ...coreRoutes,
  ...legacyRedirects,
  serviceDetailRoute,
  industryDetailRoute,
  ...companyRoutes,
  ...authRoutes,
  notFoundRoute
]
