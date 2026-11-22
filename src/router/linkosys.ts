import type { RouteRecordRaw } from 'vue-router'
import { seoRouteByPath } from '@/content/seo-routes'

const SUFFIX = 'Linkosys'

const title = (value: string) => `${value} | ${SUFFIX}`

/**
 * Route meta comes from src/content/seo-routes.ts, the same list the build uses
 * to bake per-route head tags and to generate the sitemap. A missing entry is a
 * programming error, so it throws rather than silently serving the default.
 */
const metaFor = (path: string) => {
  const entry = seoRouteByPath(path)
  if (!entry) throw new Error(`No SEO entry for route ${path} in seo-routes.ts`)
  return {
    title: entry.title,
    description: entry.description,
    jsonLd: entry.jsonLd,
    ogImage: entry.ogImage,
    noindex: entry.noindex
  }
}

const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'homepage',
    meta: metaFor('/'),
    component: () => import('@/views/Linkosys/homepage.vue')
  },
  {
    path: '/services',
    name: 'services',
    meta: metaFor('/services'),
    component: () => import('@/views/Linkosys/ServicesIndex.vue')
  },
  {
    path: '/solutions',
    name: 'solutions',
    meta: metaFor('/solutions'),
    component: () => import('@/views/Linkosys/SolutionsPage.vue')
  },
  {
    path: '/industries',
    name: 'industries',
    meta: metaFor('/industries'),
    component: () => import('@/views/Linkosys/IndustriesPage.vue')
  },
  {
    path: '/government',
    name: 'government',
    meta: metaFor('/government'),
    component: () => import('@/views/Linkosys/GovernmentPage.vue')
  },
  {
    path: '/case-studies',
    name: 'case-studies',
    meta: metaFor('/case-studies'),
    component: () => import('@/views/Linkosys/CaseStudiesPage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: metaFor('/contact'),
    component: () => import('@/views/Linkosys/contact.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    meta: metaFor('/privacy'),
    component: () => import('@/views/Linkosys/privacy.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    meta: metaFor('/projects'),
    component: () => import('@/views/Linkosys/projects.vue')
  },
  {
    path: '/commingsoon',
    name: 'commingsoon',
    meta: metaFor('/commingsoon'),
    component: () => import('@/views/Linkosys/commingsoon.vue')
  }
]

/** One template renders all six service pages from content. */
const serviceDetailRoute: RouteRecordRaw = {
  path: '/services/:slug',
  name: 'services.detail',
  meta: { title: title('Services') },
  component: () => import('@/views/Linkosys/ServiceDetail.vue')
}

const industryDetailRoute: RouteRecordRaw = {
  path: '/industries/:slug',
  name: 'industry.detail',
  meta: { title: title('Industries') },
  component: () => import('@/views/Linkosys/IndustryDetail.vue')
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
    path: '/company/blog/:slug',
    name: 'insights.detail',
    component: () => import('@/views/Linkosys/InsightDetail.vue')
  },
  {
    path: '/company/aboutus',
    name: 'company.aboutus',
    meta: metaFor('/company/aboutus'),
    component: () => import('@/views/Linkosys/aboutus.vue')
  },
  {
    path: '/company/team',
    name: 'company.team',
    meta: metaFor('/company/team'),
    component: () => import('@/views/Linkosys/team.vue')
  },
  {
    path: '/company/partners',
    name: 'company.partners',
    meta: metaFor('/company/partners'),
    component: () => import('@/views/Linkosys/partners.vue')
  },
  {
    path: '/company/blog',
    name: 'company.blog',
    meta: metaFor('/company/blog'),
    component: () => import('@/views/Linkosys/blog.vue')
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
  notFoundRoute
]
