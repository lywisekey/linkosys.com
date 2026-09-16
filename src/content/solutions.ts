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
 * Delivered work, taken from the project list Linkosys already publishes on this
 * site. Nothing here is invented.
 *
 * An earlier version of this page rendered three empty "data required" cards.
 * For a buyer that reads as a company with no track record, which is worse than
 * showing real work described plainly. Entries are selected for relevance to the
 * government, manufacturing and enterprise audiences; the full project list
 * remains on /projects.
 *
 * `results` stays null until Linkosys supplies client-approved metrics — those
 * are the one thing that must never be estimated.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'production-traceability',
    title: 'Product traceability and production management',
    sector: 'Manufacturing',
    challenge:
      'Production and supply records were held in systems that could not be reconciled, so a unit could not be traced back through its production history.',
    approach:
      'Built a shared traceability record spanning production and distribution events, with each step written once and readable by every downstream system.',
    solution:
      'A production management and traceability platform recording genealogy from input materials through to distributed product.',
    technology: ['Distributed ledger', 'Systems integration', 'Web application'],
    results: null
  },
  {
    slug: 'warehouse-management',
    title: 'Online warehouse management system',
    sector: 'Operations',
    challenge:
      'Stock movement, locations and fulfilment status were tracked manually, leaving inventory accurate only as of the last count.',
    approach:
      'Modelled the real warehouse process first — receiving, put-away, picking, dispatch — then built to it rather than to a generic inventory template.',
    solution:
      'A browser-based warehouse management system covering inventory, locations, movement and order fulfilment.',
    technology: ['Web application', 'Relational database', 'Role-based access'],
    results: null
  },
  {
    slug: 'voice-ai-ordering',
    title: 'Voice-driven AI reservations and ordering',
    sector: 'Applied AI',
    challenge:
      'Orders and reservations arrived by phone and had to be transcribed by staff, which capped throughput at busy periods.',
    approach:
      'Applied speech recognition and intent handling to the narrow, high-volume part of the conversation, leaving staff to handle exceptions.',
    solution:
      'A mobile application taking spoken reservations and orders and passing structured records to the operator.',
    technology: ['Speech recognition', 'Natural language processing', 'Mobile application'],
    results: null
  },
  {
    slug: 'vehicle-identification',
    title: 'Street vehicle identification',
    sector: 'Applied AI',
    challenge:
      'Identifying a vehicle from a street photograph required manual lookup against reference sources.',
    approach:
      'Trained and packaged an image classification model against vehicle imagery, with the inference path sized to run from a phone.',
    solution:
      'A mobile application returning vehicle identification from a camera image.',
    technology: ['Computer vision', 'Image classification', 'Mobile application'],
    results: null
  },
  {
    slug: 'smart-parking',
    title: 'Smart parking locator',
    sector: 'Civic technology',
    challenge:
      'Drivers had no current view of parking availability, adding circulation time and congestion.',
    approach:
      'Combined location services with availability data and presented the result as a single map view rather than a list of sources.',
    solution:
      'A mobile application surfacing nearby parking availability and location guidance.',
    technology: ['Mobile application', 'Geolocation', 'Mapping services'],
    results: null
  },
  {
    slug: 'community-assistance',
    title: 'COVID-19 community assistance platform',
    sector: 'Public sector',
    challenge:
      'Assistance requests and offers of help were scattered across channels during a period when response time mattered.',
    approach:
      'Built a single intake and coordination point that could be stood up quickly and operated by non-technical staff.',
    solution:
      'A public web platform coordinating community assistance requests and volunteer response.',
    technology: ['Web application', 'Content management', 'Public-facing forms'],
    results: null
  }
]
