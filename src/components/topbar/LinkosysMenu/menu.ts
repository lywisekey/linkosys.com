import type { RouteLocationRaw } from 'vue-router'
import { services } from '@/content/services'
import { solutions } from '@/content/solutions'
import { industries } from '@/content/industries'

export type NavLink = {
  label: string
  to: RouteLocationRaw
  description?: string
}

export type NavSection = {
  label: string
  /** Top-level destination when the section itself is a page. */
  to?: RouteLocationRaw
  columns?: number
  links: NavLink[]
  footer?: { label: string; to: RouteLocationRaw }
}

export const navSections: NavSection[] = [
  {
    label: 'Services',
    to: { name: 'services' },
    columns: 2,
    links: services.map((service) => ({
      label: service.name,
      description: service.summary,
      to: { name: 'services.detail', params: { slug: service.slug } }
    })),
    footer: { label: 'All services', to: { name: 'services' } }
  },
  {
    label: 'Solutions',
    to: { name: 'solutions' },
    columns: 2,
    links: solutions.map((solution) => ({
      label: solution.title,
      to: { name: 'solutions' }
    })),
    footer: { label: 'All solutions', to: { name: 'solutions' } }
  },
  {
    label: 'Industries',
    to: { name: 'industries' },
    links: industries.map((industry) => ({
      label: industry.name,
      to:
        industry.slug === 'government'
          ? { name: 'government' }
          : { name: 'industry.detail', params: { slug: industry.slug } }
    })),
    footer: { label: 'All industries', to: { name: 'industries' } }
  },
  {
    label: 'Company',
    links: [
      { label: 'About Linkosys', to: { name: 'company.aboutus' } },
      { label: 'Our Approach', to: { name: 'company.aboutus', hash: '#approach' } },
      { label: 'Leadership & Team', to: { name: 'company.team' } },
      { label: 'Partners & Clients', to: { name: 'company.partners' } },
      { label: 'Case Studies', to: { name: 'case-studies' } },
      { label: 'Insights', to: { name: 'company.blog' } }
    ]
  }
]

/** Government gets a top-level slot of its own — it is the primary buyer path. */
export const primaryLinks: NavLink[] = [{ label: 'Government', to: { name: 'government' } }]
