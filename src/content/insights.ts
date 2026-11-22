export type Insight = {
  slug: string
  title: string
  description: string
  date: string
  sections: { heading: string; paragraphs: string[]; steps?: string[] }[]
  related: { label: string; path: string }[]
}

/** Company-authored educational guides; no invented individual bylines or results. */
export const insights: Insight[] = [
  {
    slug: 'choose-enterprise-it-consulting-partner-california',
    title: 'How to choose an enterprise IT consulting partner in California',
    description:
      'A practical buying checklist for California businesses comparing IT consulting partners: discovery, technical fit, delivery ownership, security and handover.',
    date: '2026-11-21',
    sections: [
      {
        heading: 'What should you look for in an IT consulting partner?',
        paragraphs: [
          'Look for a partner that can connect a specific business constraint to a feasible technology plan. Technical breadth matters, but so do named delivery owners, transparent assumptions, security practices and a handover plan. A useful proposal explains what will be assessed, what decisions the assessment supports and how you will accept the work.',
          'For a California business with an existing application estate, the immediate challenge may be integration, delivery capacity or operational risk. Write down the workflow that is constrained and the consequences of leaving it unchanged before asking vendors for a solution.'
        ]
      },
      {
        heading: 'How do you compare consulting proposals fairly?',
        paragraphs: [
          'Give each candidate the same context: business objective, current systems, known dependencies, internal team capacity and fixed constraints. Ask candidates to identify missing information and separate confirmed scope from assumptions. A proposal that supplies a precise estimate before understanding dependencies needs further scrutiny.'
        ],
        steps: [
          'Define one business outcome and the person accountable for it.',
          'Inventory the systems, data and teams the work will touch.',
          'Ask for discovery deliverables, decision points and acceptance criteria.',
          'Compare staffing, commercial assumptions, exclusions and ongoing support.',
          'Review access controls, release responsibilities and knowledge transfer.'
        ]
      },
      {
        heading: 'What evidence should a partner provide?',
        paragraphs: [
          'Request approved examples of comparable work, a sample delivery plan and an explanation of the proposed team. Check whether references relate to the same type of system or operating constraint. A logo does not establish which work was performed, and an unqualified outcome claim does not explain how it was measured.',
          'Ask who will make architecture decisions, review changes and own production incidents. Establish how the supplier works with your security team, internal standards and other vendors. If the work involves manufacturing, discuss production windows and equipment access before agreeing a migration schedule.'
        ]
      },
      {
        heading: 'Does the partner need an office in every city you operate in?',
        paragraphs: [
          'An office address alone does not establish delivery fit. Confirm working hours, onsite requirements, travel arrangements, data access and escalation coverage. For multi-site operations, define which activities require plant or office access and which can be delivered remotely.',
          'Linkosys publishes an Irvine, California office and serves organizations across the United States. Discuss the location and access requirements of your project directly; do not assume a local office or onsite availability from a service description.'
        ]
      },
      {
        heading: 'What should the first engagement produce?',
        paragraphs: [
          'A bounded assessment should leave you with a documented current state, prioritized risks, delivery options and a staged roadmap. Agree how the work will be reviewed before it starts. Implementation can then be scoped against the evidence rather than an initial guess.',
          'Bring the systems involved, the business constraint and the timeline to a consultation. Linkosys can discuss consulting, engineering and delivery capabilities against that requirement.'
        ]
      }
    ],
    related: [
      { label: 'Enterprise IT consulting', path: '/services/it-consulting' },
      { label: 'Technology program management', path: '/services/program-management' },
      { label: 'Manufacturing and MES integration', path: '/industries/manufacturing' }
    ]
  },
  {
    slug: 'custom-software-vs-off-the-shelf',
    title: 'Custom software vs. off-the-shelf: how to decide',
    description:
      'Compare workflow fit, integration, ownership cost, delivery risk and support before choosing custom software or an off-the-shelf business application.',
    date: '2026-11-21',
    sections: [
      {
        heading: 'When is custom software the right choice?',
        paragraphs: [
          'Consider custom software when a business-critical workflow or integration cannot be met reasonably by an existing product. Prefer a packaged application when a standard workflow meets the need with manageable configuration. The decision should compare business fit and long-term operating cost, including the team needed to maintain each option.',
          'The choice is often hybrid. An enterprise can retain a packaged ERP or CRM while building an integration layer, employee application or specialized operational workflow around it. Identify which part of the requirement creates value before deciding which part to build.'
        ]
      },
      {
        heading: 'How do the options compare?',
        paragraphs: [
          'Packaged software provides a product and vendor release cycle. It can reduce initial development, but configuration, data migration and process change still require delivery work. Licensing, user tiers, API limits and vendor support terms can materially affect ongoing cost.',
          'Custom software gives control over the application design and delivery priorities. That control also brings responsibility for security updates, reliability, testing, documentation and support. Access to source code is useful only when the receiving team can build, deploy and operate it.',
          'A hybrid approach can preserve established business systems while filling a specific workflow gap. It adds integration responsibilities: data ownership, failure recovery and compatibility with vendor upgrades must be explicit.'
        ]
      },
      {
        heading: 'What belongs in the total cost comparison?',
        paragraphs: [
          'Compare the same operating period and expected usage for both options. Include implementation, licensing, infrastructure, data cleanup, integrations, training, security review, ongoing support and eventual exit costs. Record uncertainty rather than presenting an early estimate as a fixed outcome.',
          'For custom development, scope and integration complexity drive the estimate. For packaged software, test pricing against growth and required features. In both cases, define who pays for changes, who owns the data and how it can be exported.'
        ]
      },
      {
        heading: 'How should a business validate the decision?',
        paragraphs: [
          'Use a representative workflow and realistic data. A demonstration should include exceptions, permissions and integration failures, not only the easiest path. Invite the people who will use and support the system to review it.'
        ],
        steps: [
          'List required workflows and separate essential controls from preferences.',
          'Test a packaged option against the hardest requirement.',
          'Estimate a bounded custom alternative, including support and handover.',
          'Compare costs, dependencies, risks and delivery timing on the same basis.',
          'Agree acceptance criteria and a staged rollout before committing to a wider scope.'
        ]
      },
      {
        heading: 'What should happen after the decision?',
        paragraphs: [
          'Start with a bounded release that proves the operational workflow and integration assumptions. Plan migration, validation and rollback while the old process is still available. Assign ownership for support and future changes before launch.',
          'Linkosys provides custom software engineering, modernization and systems integration. A discussion of your current workflow can help establish whether the requirement calls for configuration, custom development or a combination.'
        ]
      }
    ],
    related: [
      { label: 'Custom software development', path: '/services/software-development' },
      { label: 'Technology assessment and roadmap', path: '/services/it-consulting' },
      { label: 'Cloud infrastructure consulting', path: '/services/cloud-infrastructure' }
    ]
  }
]
export const insightBySlug = (slug: string) => insights.find((insight) => insight.slug === slug)
