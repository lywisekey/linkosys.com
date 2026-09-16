/**
 * Content model for the Linkosys marketing site.
 *
 * Every page is data-driven so the six service pages, the industry pages and the
 * government page share one template each instead of duplicating markup. Copy
 * lives here; components stay presentational.
 */

export type Capability = {
  title: string
  description: string
}

export type BusinessProblem = {
  problem: string
  response: string
}

export type ProcessStep = {
  title: string
  description: string
}

/** A `verify` flag renders a visible marker so unconfirmed copy cannot ship silently. */
export type Credential = {
  label: string
  value: string
  detail?: string
  verify?: boolean
}

export type CaseStudy = {
  slug: string
  title: string
  sector: string
  /** Null fields render an explicit "data required" state rather than invented content. */
  challenge: string | null
  approach: string | null
  solution: string | null
  technology: string[]
  results: string | null
  placeholder?: boolean
}

export type ServicePage = {
  slug: string
  /** Short label for cards and navigation. */
  name: string
  /** Full H1 for the service page. */
  headline: string
  /** One sentence used on cards, meta description and the page intro. */
  summary: string
  intro: string
  problems: BusinessProblem[]
  capabilities: Capability[]
  approach: ProcessStep[]
  technology: { group: string; items: string[] }[]
  cta: { label: string; sub: string }
  seoTitle: string
  seoDescription: string
}

export type SolutionEntry = {
  slug: string
  title: string
  summary: string
  outcomes: string[]
  relatedServices: string[]
}

export type IndustryEntry = {
  slug: string
  name: string
  headline: string
  summary: string
  needs: string[]
  capabilities: Capability[]
  /** Concrete systems we build in this sector — what, not merely which discipline. */
  deliverables?: string[]
  /** Constraints specific to the sector that shape how work is delivered. */
  considerations?: { title: string; description: string }[]
  seoTitle: string
  seoDescription: string
}
