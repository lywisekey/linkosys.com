export type Answer = { question: string; answer: string }

export const serviceAnswers: Record<string, Answer[]> = {
  'it-consulting': [
    {
      question: 'What does an enterprise IT consulting company do?',
      answer:
        'An enterprise IT consulting company assesses business processes, applications, infrastructure and delivery risks, then recommends a practical technology plan. The work should connect business priorities to architecture decisions, delivery milestones, ownership and measurable acceptance criteria.'
    },
    {
      question: 'What should a California business look for in an IT consulting partner?',
      answer:
        'Look for relevant technical capabilities, a clear discovery process, transparent scope and pricing assumptions, and a plan for security, documentation and handover. Ask who will do the work and request references or approved project examples relevant to your environment.'
    },
    {
      question: 'Can consulting lead into implementation?',
      answer:
        'Yes. Linkosys combines technology consulting with software engineering, AI and data, cloud, cybersecurity, staffing and program management. An assessment can define the work before the appropriate engineering capabilities are selected.'
    }
  ],
  'software-development': [
    {
      question: 'How much does custom software development cost?',
      answer:
        'Cost depends on scope, integrations, data migration, security requirements and ongoing support. Define the highest-value workflow first, identify technical dependencies and agree acceptance criteria before requesting an estimate. A phased plan makes assumptions and changes easier to review; a reliable quote requires discovery.'
    },
    {
      question: 'When should a business choose custom software over a packaged product?',
      answer:
        'Custom development is worth evaluating when a critical workflow, integration or control requirement cannot be met reasonably by an existing product. Compare total ownership cost, implementation time, licensing, maintainability and the internal skills needed for both options.'
    },
    {
      question: 'Can an enterprise application be modernized without a full replacement?',
      answer:
        'Often, yes. Start by mapping dependencies and business rules, then replace bounded components incrementally. Tests, data reconciliation, monitoring and rollback plans help control risk while existing operations continue.'
    }
  ],
  'ai-and-data': [
    {
      question: 'How do businesses choose an AI development partner?',
      answer:
        'Choose a partner that starts with a business workflow and evaluates data quality, privacy, integration and human review before selecting a model. Ask how accuracy will be tested, failure cases handled and operating cost monitored against a non-AI baseline.'
    },
    {
      question: 'Which business processes are suitable for AI automation?',
      answer:
        'Document classification, information extraction, internal search and decision support can be candidates when representative data and clear review criteria are available. Begin with a bounded workflow, evaluate mistakes and keep human approval where the consequences require it.'
    },
    {
      question: 'What should happen before an enterprise AI pilot?',
      answer:
        'Define the decision or task, who owns it, which data may be used and how success will be evaluated. Establish access controls, a representative evaluation set and a fallback process before connecting a model to production systems.'
    }
  ],
  'cloud-infrastructure': [
    {
      question: 'What are the benefits of enterprise cloud migration?',
      answer:
        'Cloud migration can improve deployment flexibility, resilience and access to managed services. Benefits depend on workload design and operating practices; migration alone does not guarantee lower costs. Assess licensing, data transfer, security and support before choosing a target architecture.'
    },
    {
      question: 'How should an enterprise plan a cloud migration?',
      answer:
        'Inventory applications and dependencies, classify data, define recovery requirements and choose a migration approach for each workload. Establish identity, networking, monitoring and cost controls before a pilot, then migrate in stages with validation and rollback plans.'
    },
    {
      question: 'Should every application move to the cloud?',
      answer:
        'No. Latency, equipment dependencies, data restrictions, licensing and predictable utilization may favor an on-premises or hybrid design. Compare each workload against business requirements rather than setting a blanket migration target.'
    }
  ],
  cybersecurity: [
    {
      question: 'Where should a mid-sized business start with cybersecurity?',
      answer:
        'Start with an inventory of critical systems, data and access. Prioritize identity controls, patching, recoverable backups, logging and an incident response process according to business risk. Assign owners and verify controls rather than relying only on written policies.'
    },
    {
      question: 'How does cybersecurity consulting support compliance?',
      answer:
        'Consulting can map requirements to technical controls, identify gaps and organize evidence. Applicable obligations depend on the organization and its contracts; an assessment or implementation project does not by itself confer certification or guarantee compliance.'
    },
    {
      question: 'Can security be integrated into software delivery?',
      answer:
        'Yes. Threat modeling, access design, dependency review, automated checks and auditable release processes can be built into delivery. Controls should fit the application risk and be checked throughout development and operations.'
    }
  ],
  'it-staffing': [
    {
      question: 'When should a business use staff augmentation?',
      answer:
        'Staff augmentation fits a team that has delivery ownership but needs particular skills or additional capacity. Define the role, expected outcomes, working arrangements and technical evaluation criteria before selecting candidates.'
    },
    {
      question: 'What technology staffing models does Linkosys offer?',
      answer:
        'Linkosys lists contract staffing, contract-to-hire, direct placement and team augmentation. It also supports subcontract staffing for prime contractors. Availability and engagement terms depend on the specific role and requirement.'
    }
  ],
  'program-management': [
    {
      question: 'How is program management different from project management?',
      answer:
        'Project management coordinates a defined scope, schedule and delivery team. Program management coordinates related projects, dependencies and shared decisions so their combined outcomes support a business objective.'
    },
    {
      question: 'How should technology delivery progress be measured?',
      answer:
        'Use completed, accepted increments alongside schedule, budget, risk and dependency reporting. Agree acceptance criteria and decision owners up front so a status report can be checked against working deliverables.'
    }
  ]
}

export const manufacturingAnswers: Answer[] = [
  {
    question: 'What is a manufacturing execution system (MES)?',
    answer:
      'An MES manages and records production execution on the shop floor. It connects work orders, routing, material traceability, quality checks and production status with enterprise systems such as ERP.'
  },
  {
    question: 'How can a manufacturer implement MES software?',
    answer:
      'Map one production process, agree the required traceability and quality controls, and identify ERP and machine interfaces. Pilot on a bounded line or workflow, validate data with operators, plan cutover around production and expand only after the pilot meets acceptance criteria.'
  },
  {
    question: 'How do MES and ERP work together?',
    answer:
      'ERP typically manages business planning, orders and inventory, while MES records how production executes. Integration can exchange orders, material usage, completions and quality status. Agree ownership, identifiers and error recovery for every interface.'
  }
]

/** Intended business benefits, not claims of measured client results. */
export const serviceBenefits: Record<string, string[]> = {
  'it-consulting': [
    'Priorities tied to the business constraint',
    'A staged plan with visible dependencies',
    'Clear ownership and acceptance criteria'
  ],
  'software-development': [
    'Workflows designed around your operations',
    'Integration with the systems you already use',
    'Documentation and tests to support long-term ownership'
  ],
  'ai-and-data': [
    'Less repetitive handling in suitable workflows',
    'Evaluation criteria for accuracy and failure cases',
    'Governed access to connected operational data'
  ],
  'cloud-infrastructure': [
    'Infrastructure aligned to recovery and availability requirements',
    'Repeatable environments and deployment processes',
    'Visibility into operating cost and capacity'
  ],
  cybersecurity: [
    'Security priorities tied to business risk',
    'Controls integrated into engineering and operations',
    'Evidence that supports assessment and review'
  ],
  'it-staffing': [
    'Targeted technical capacity alongside your team',
    'Screening against the work the role requires',
    'Engagement models matched to your hiring needs'
  ],
  'program-management': [
    'Shared visibility across delivery dependencies',
    'Defined owners for risks and decisions',
    'Progress reviewed against accepted work'
  ]
}
