import type { IndustryEntry } from './types'

export const industries: IndustryEntry[] = [
  {
    slug: 'government',
    name: 'Government',
    headline: 'Technology solutions for government',
    summary:
      'Software engineering, data, cloud, cybersecurity, staffing and program management for government organizations and the contractors who serve them.',
    needs: [
      'Modernizing systems that are past end of support',
      'Meeting accessibility and security control requirements',
      'Adding technical capacity without a lengthy hiring cycle',
      'Delivering under fixed schedules and defined acceptance criteria'
    ],
    capabilities: [
      {
        title: 'Application modernization',
        description: 'Incremental replacement of aging systems while the service stays available.'
      },
      {
        title: 'Accessibility compliance',
        description: 'Interfaces built and tested against Section 508 and WCAG requirements.'
      },
      {
        title: 'Security and compliance support',
        description: 'Control mapping and evidence against NIST and agency-specific frameworks.'
      },
      {
        title: 'Staff augmentation',
        description: 'Cleared or uncleared technical staff against defined labour categories.'
      }
    ],
    seoTitle: 'Government IT Services and Technology Consulting | Linkosys',
    seoDescription:
      'Linkosys provides software engineering, data, cloud, cybersecurity, IT staffing and program management for government agencies and prime contractors. GSA Schedule 47QTCA21D004X.'
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    headline: 'Your factory. Connected.',
    summary:
      'Connect production systems, machines, people and data so what happens on the floor is visible everywhere it matters.',
    needs: [
      'Production status that is only known by walking the floor',
      'Machine data that never reaches the systems that plan work',
      'Quality issues found after the fact instead of at the station',
      'Paper travelers and spreadsheets holding the process together'
    ],
    capabilities: [
      {
        title: 'Manufacturing execution (MES)',
        description:
          'Work order execution, routing, traceability and shop floor data collection connected to the systems above it.'
      },
      {
        title: 'Production visibility',
        description:
          'Live dashboards for output, downtime, throughput and constraint, built for the floor and for management.'
      },
      {
        title: 'Machine and equipment integration',
        description:
          'Data acquisition from equipment, PLCs and historians, normalized into a usable operational model.'
      },
      {
        title: 'IT and OT integration',
        description:
          'Connecting shop floor systems to ERP, quality and planning so information moves in both directions.'
      },
      {
        title: 'Quality management',
        description: 'In-process checks, non-conformance handling and genealogy for traceability.'
      },
      {
        title: 'Scheduling and work orders',
        description: 'Order release, sequencing and status tracking against real capacity.'
      },
      {
        title: 'Reporting and analytics',
        description: 'OEE, yield, scrap and downtime analysis using consistent, auditable definitions.'
      },
      {
        title: 'Process automation',
        description: 'Removing manual re-entry between systems and eliminating paper-based steps.'
      }
    ],
    seoTitle: 'Manufacturing Technology and MES Consulting | Linkosys',
    seoDescription:
      'MES, production visibility, machine integration, IT/OT convergence and quality systems for manufacturers. Connect production systems, machines, people and data.'
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    headline: 'Healthcare technology built for regulated environments',
    summary:
      'Application development, integration and data work for healthcare organizations operating under privacy and audit obligations.',
    needs: [
      'Integration between clinical and administrative systems',
      'Protecting regulated data without blocking legitimate access',
      'Reporting across fragmented sources',
      'Modernizing systems that cannot be taken offline'
    ],
    capabilities: [
      { title: 'Systems integration', description: 'Interfaces between clinical, scheduling and billing platforms.' },
      { title: 'Data and reporting', description: 'Governed reporting across operational and administrative data.' },
      { title: 'Security and privacy', description: 'Access control, auditability and retention against policy.' },
      { title: 'Application modernization', description: 'Incremental replacement of legacy applications.' }
    ],
    seoTitle: 'Healthcare Technology Consulting | Linkosys',
    seoDescription:
      'Application development, systems integration, data and security engineering for healthcare organizations operating in regulated environments.'
  },
  {
    slug: 'transportation',
    name: 'Transportation & Logistics',
    headline: 'Systems that keep operations moving',
    summary:
      'Operational software, integration and analytics for transportation, logistics and public infrastructure organizations.',
    needs: [
      'Visibility across assets, routes and schedules',
      'Integration between operational and planning systems',
      'Field and offline-capable applications',
      'Reporting for operational and regulatory needs'
    ],
    capabilities: [
      { title: 'Operational applications', description: 'Dispatch, scheduling and field tooling.' },
      { title: 'Integration', description: 'Connecting operational, asset and planning systems.' },
      { title: 'Analytics', description: 'Performance, utilization and exception reporting.' },
      { title: 'Mobile and field systems', description: 'Applications that work in poor connectivity.' }
    ],
    seoTitle: 'Transportation and Logistics Technology Consulting | Linkosys',
    seoDescription:
      'Operational software, systems integration, mobile field applications and analytics for transportation, logistics and infrastructure organizations.'
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    headline: 'Engineering under audit and control requirements',
    summary:
      'Application engineering, data and security work for financial organizations where auditability is a requirement, not a feature.',
    needs: [
      'Change control and auditability in delivery',
      'Data quality and lineage for reporting',
      'Security controls evidenced on demand',
      'Modernization without interrupting service'
    ],
    capabilities: [
      { title: 'Application engineering', description: 'Systems built with traceable change control.' },
      { title: 'Data and lineage', description: 'Governed pipelines with auditable definitions.' },
      { title: 'Security engineering', description: 'Controls built into delivery and documented.' },
      { title: 'Automation', description: 'Reducing manual handling in reconciliation and reporting.' }
    ],
    seoTitle: 'Financial Services Technology Consulting | Linkosys',
    seoDescription:
      'Application engineering, governed data pipelines, security and automation for financial services organizations with audit and control obligations.'
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    headline: 'Technology delivery for established organizations',
    summary:
      'Software engineering, data, cloud and program management for organizations with existing systems, existing teams and real constraints.',
    needs: [
      'Delivering change without disrupting operations',
      'Working inside existing architecture and standards',
      'Adding capability alongside an internal team',
      'Managing multi-vendor delivery'
    ],
    capabilities: [
      { title: 'Application delivery', description: 'Building into an existing estate and its standards.' },
      { title: 'Modernization', description: 'Staged replacement of systems that still carry load.' },
      { title: 'Team augmentation', description: 'Engineers working inside your process and tooling.' },
      { title: 'Program management', description: 'Coordination across internal teams and vendors.' }
    ],
    seoTitle: 'Enterprise Technology Consulting | Linkosys',
    seoDescription:
      'Software engineering, modernization, cloud, data and program management for enterprise organizations with established systems and internal delivery teams.'
  }
]

export const industryBySlug = (slug: string) => industries.find((entry) => entry.slug === slug)
