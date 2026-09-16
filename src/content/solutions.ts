import type { CaseStudy, SolutionEntry } from './types'

/** Solutions are framed as business problems, not product names. */
export const solutions: SolutionEntry[] = [
  {
    slug: 'legacy-modernization',
    title: 'Modernize legacy systems',
    summary:
      'Replace applications and infrastructure that have become too expensive or too risky to change, without taking the service offline.',
    outcomes: [
      'Changes ship without a release freeze',
      'Support costs stop rising with system age',
      'Security and accessibility obligations can be met',
      'Knowledge is documented rather than held by one person'
    ],
    relatedServices: ['software-development', 'cloud-infrastructure']
  },
  {
    slug: 'process-automation',
    title: 'Automate business processes',
    summary:
      'Remove repetitive manual work using software, data and AI — including the integration and exception handling that make automation survive contact with reality.',
    outcomes: [
      'Manual re-entry between systems is eliminated',
      'Processing time drops and becomes predictable',
      'Exceptions are routed instead of discovered late',
      'Staff time moves to work that needs judgement'
    ],
    relatedServices: ['ai-and-data', 'software-development']
  },
  {
    slug: 'connected-data',
    title: 'Connect data across systems',
    summary:
      'Integrate systems that were never designed to work together and produce one governed view of operations.',
    outcomes: [
      'One agreed definition for each reported metric',
      'Current data instead of end-of-month reporting',
      'Lineage that can be audited',
      'Decisions made on the same numbers across teams'
    ],
    relatedServices: ['ai-and-data', 'software-development']
  },
  {
    slug: 'digital-products',
    title: 'Build digital products',
    summary:
      'Design and engineer new applications for internal operations or external users, from definition through release and support.',
    outcomes: [
      'A working system in production, not a prototype',
      'Accessibility and security handled during build',
      'Automated tests and a repeatable release path',
      'Documentation and handover to your team'
    ],
    relatedServices: ['software-development', 'program-management']
  },
  {
    slug: 'manufacturing-modernization',
    title: 'Modernize manufacturing operations',
    summary:
      'Connect production systems, machines, people and data so plant performance is visible and controllable in real time.',
    outcomes: [
      'Production status visible without walking the floor',
      'Machine data reaching planning and quality systems',
      'Paper travelers and spreadsheets removed from the process',
      'Downtime and scrap measured consistently'
    ],
    relatedServices: ['software-development', 'ai-and-data']
  },
  {
    slug: 'secure-delivery',
    title: 'Meet security and compliance obligations',
    summary:
      'Build controls into architecture and delivery so an assessment is a review of existing evidence rather than a scramble.',
    outcomes: [
      'Controls mapped to the framework that applies',
      'Vulnerabilities found in the pipeline, not in production',
      'Access reviewable on a schedule',
      'Evidence ready when an assessor asks'
    ],
    relatedServices: ['cybersecurity', 'cloud-infrastructure']
  }
]

export const solutionBySlug = (slug: string) => solutions.find((entry) => entry.slug === slug)

/**
 * Case studies are the strongest trust signal a buyer looks for, and the easiest
 * thing to fabricate. These entries are deliberately unpopulated: the structure
 * ships, the content waits for client-supplied, approved detail. Nothing here
 * invents a client, a metric or an outcome.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'government-modernization',
    title: 'Government application modernization',
    sector: 'Government',
    challenge: null,
    approach: null,
    solution: null,
    technology: [],
    results: null,
    placeholder: true
  },
  {
    slug: 'manufacturing-visibility',
    title: 'Manufacturing production visibility',
    sector: 'Manufacturing',
    challenge: null,
    approach: null,
    solution: null,
    technology: [],
    results: null,
    placeholder: true
  },
  {
    slug: 'enterprise-data-platform',
    title: 'Enterprise data and reporting platform',
    sector: 'Enterprise',
    challenge: null,
    approach: null,
    solution: null,
    technology: [],
    results: null,
    placeholder: true
  }
]
