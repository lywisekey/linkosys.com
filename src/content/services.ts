import type { ServicePage } from './types'

/**
 * Six core services. The previous site sold "web design", "mobile apps" and
 * "blockchain" as peers, which reads as a web agency to an enterprise or
 * government buyer. Those disciplines still exist here — they are folded into
 * Software Development, where they belong — and the old URLs redirect in.
 */
export const services: ServicePage[] = [
  {
    slug: 'software-development',
    name: 'Software Development',
    headline: 'Software engineering for systems people depend on',
    summary: 'Build and modernize scalable enterprise applications.',
    intro:
      'We design, build and modernize applications that carry real operational load — internal platforms, customer-facing systems, integrations and the services behind them. Work is delivered by engineers who stay with the system through release and support, not handed to a separate team at the end.',
    problems: [
      {
        problem: 'A core application is too old to change safely',
        response:
          'We map the system, isolate the parts that carry business rules, and modernize incrementally so the service keeps running while it is replaced.'
      },
      {
        problem: 'Delivery has slowed and releases are risky',
        response:
          'We put automated testing, environment parity and a repeatable release path in place so shipping stops being an event.'
      },
      {
        problem: 'Systems do not talk to each other',
        response:
          'We build the integration and API layer that lets existing platforms exchange data without another point-to-point workaround.'
      },
      {
        problem: 'A capable team is short on specific engineering depth',
        response:
          'We work inside your process and tooling, adding the skills the roadmap needs without changing how your team runs.'
      }
    ],
    capabilities: [
      {
        title: 'Enterprise application development',
        description:
          'Web applications, internal platforms and line-of-business systems built for maintainability and long service life.'
      },
      {
        title: 'Application modernization',
        description:
          'Incremental replacement of legacy systems, framework and language migrations, and decomposition of monoliths where it earns its cost.'
      },
      {
        title: 'API and systems integration',
        description:
          'REST and event-driven interfaces, middleware and data exchange between platforms that were never designed to connect.'
      },
      {
        title: 'Mobile application development',
        description:
          'Native and cross-platform applications, including field and offline-capable use cases.'
      },
      {
        title: 'Front-end engineering',
        description:
          'Accessible, responsive interfaces built to standards, including Section 508 and WCAG requirements.'
      },
      {
        title: 'Quality engineering',
        description:
          'Automated test coverage, CI pipelines and release verification built into delivery rather than bolted on.'
      }
    ],
    approach: [
      {
        title: 'Assess',
        description:
          'We review the current system, constraints and delivery process before proposing a direction.'
      },
      {
        title: 'Define',
        description:
          'Scope, architecture and an incremental delivery plan with milestones your stakeholders can track.'
      },
      {
        title: 'Build',
        description:
          'Short iterations with working software, automated tests and demonstrable progress each cycle.'
      },
      {
        title: 'Operate',
        description:
          'Release support, documentation and knowledge transfer so your team can own the result.'
      }
    ],
    technology: [
      { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'PHP'] },
      { group: 'Frameworks', items: ['Vue', 'React', 'Node.js', '.NET', 'Spring', 'Laravel'] },
      { group: 'Data', items: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Redis'] },
      { group: 'Delivery', items: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI', 'Terraform'] }
    ],
    cta: {
      label: 'Talk to an Engineer',
      sub: 'Describe the system and the constraint. We will tell you how we would approach it.'
    },
    seoTitle: 'Software Development Services | Linkosys',
    seoDescription:
      'Enterprise software development and application modernization for government and commercial organizations. Custom applications, API integration, mobile and quality engineering.'
  },
  {
    slug: 'ai-and-data',
    name: 'AI & Data',
    headline: 'Data your organization can act on',
    summary: 'Turn data into decisions, automation and measurable operational insight.',
    intro:
      'Most organizations do not have a data shortage; they have data spread across systems that were never designed to be read together. We build the pipelines, models and interfaces that make that data usable, and apply AI where it changes an outcome rather than where it demonstrates well.',
    problems: [
      {
        problem: 'Reporting takes days and arrives too late to act on',
        response:
          'We consolidate sources into a governed model and put current numbers in front of the people who make the decision.'
      },
      {
        problem: 'Every team reports a different version of the same number',
        response:
          'We define the metrics once, in one place, with the lineage visible so the definition can be audited.'
      },
      {
        problem: 'Staff spend hours on manual review and data entry',
        response:
          'We automate the repeatable part — classification, extraction, routing — and keep a human decision point where accountability requires one.'
      },
      {
        problem: 'An AI pilot cannot move into production',
        response:
          'We address the parts pilots usually skip: data quality, evaluation, monitoring, cost and access control.'
      }
    ],
    capabilities: [
      {
        title: 'Data engineering',
        description:
          'Pipelines, warehouses and integration across operational systems, with validation and lineage built in.'
      },
      {
        title: 'Analytics and reporting',
        description:
          'Dashboards and reporting built around the decision being made, not around what the source system happens to expose.'
      },
      {
        title: 'Applied AI and machine learning',
        description:
          'Document processing, classification, forecasting and retrieval systems, scoped to a measurable task.'
      },
      {
        title: 'Process automation',
        description:
          'Automating repetitive workflows end to end, including the integration and exception handling that make it hold up.'
      },
      {
        title: 'Data governance',
        description:
          'Access control, retention, quality rules and audit trails appropriate to regulated environments.'
      },
      {
        title: 'Evaluation and monitoring',
        description:
          'Accuracy benchmarks, drift detection and cost tracking so model behaviour stays observable after launch.'
      }
    ],
    approach: [
      {
        title: 'Locate',
        description: 'Identify the decision or workflow the work must improve, and how it is measured today.'
      },
      {
        title: 'Prove',
        description: 'Validate feasibility against real data before committing to a build.'
      },
      {
        title: 'Engineer',
        description: 'Build the pipeline, model and interface as a supportable production system.'
      },
      {
        title: 'Monitor',
        description: 'Instrument accuracy, cost and usage, and tune against what production shows.'
      }
    ],
    technology: [
      { group: 'Platforms', items: ['Azure', 'AWS', 'Google Cloud', 'Databricks', 'Snowflake'] },
      { group: 'Data', items: ['Python', 'SQL', 'dbt', 'Airflow', 'Kafka'] },
      { group: 'Analytics', items: ['Power BI', 'Tableau', 'Looker'] },
      { group: 'AI', items: ['PyTorch', 'scikit-learn', 'LLM APIs', 'Vector databases'] }
    ],
    cta: {
      label: 'Discuss a Data Problem',
      sub: 'Tell us the decision you cannot make today and what stands in the way.'
    },
    seoTitle: 'AI and Data Analytics Consulting | Linkosys',
    seoDescription:
      'Data engineering, analytics, applied AI and process automation for government and enterprise organizations. Governed pipelines, production models and measurable outcomes.'
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure',
    headline: 'Infrastructure that scales and stays accountable',
    summary: 'Modernize infrastructure for scalability, resilience and cost control.',
    intro:
      'Cloud work is only worth doing when it improves something specific: release speed, resilience, cost, or the ability to meet a control requirement. We plan and execute migrations and platform work against those outcomes, and leave behind infrastructure your team can operate.',
    problems: [
      {
        problem: 'Cloud spend keeps rising without a clear cause',
        response:
          'We attribute cost to workloads and owners, then remove the waste that attribution exposes.'
      },
      {
        problem: 'Infrastructure changes are manual and undocumented',
        response:
          'We move environments into version-controlled infrastructure as code so changes are reviewable and repeatable.'
      },
      {
        problem: 'A migration has stalled between data centre and cloud',
        response:
          'We sequence the remaining workloads by dependency and risk, and finish the move in defined stages.'
      },
      {
        problem: 'Recovery has never actually been tested',
        response:
          'We define recovery objectives, build to them, and rehearse the failure rather than documenting an intention.'
      }
    ],
    capabilities: [
      {
        title: 'Cloud migration',
        description:
          'Assessment, sequencing and execution for workloads moving to AWS, Azure or Google Cloud.'
      },
      {
        title: 'Infrastructure as code',
        description: 'Version-controlled, reviewable environment definitions and repeatable provisioning.'
      },
      {
        title: 'DevOps and release engineering',
        description: 'Build and deployment pipelines, environment parity and automated release gates.'
      },
      {
        title: 'Containers and orchestration',
        description: 'Containerized workloads and Kubernetes platforms sized to the team that will run them.'
      },
      {
        title: 'Reliability engineering',
        description: 'Monitoring, alerting, capacity planning and tested recovery procedures.'
      },
      {
        title: 'Cost engineering',
        description: 'Spend attribution, rightsizing and commitment planning tied to workload owners.'
      }
    ],
    approach: [
      { title: 'Inventory', description: 'Catalogue workloads, dependencies and current operating cost.' },
      { title: 'Target', description: 'Agree the architecture and the outcome each move has to deliver.' },
      { title: 'Migrate', description: 'Execute in stages, each independently verifiable and reversible.' },
      { title: 'Operate', description: 'Hand over monitoring, runbooks and cost controls to your team.' }
    ],
    technology: [
      { group: 'Cloud', items: ['AWS', 'Microsoft Azure', 'Google Cloud'] },
      { group: 'Automation', items: ['Terraform', 'Ansible', 'Bicep', 'CloudFormation'] },
      { group: 'Runtime', items: ['Kubernetes', 'Docker', 'Serverless'] },
      { group: 'Operations', items: ['Prometheus', 'Grafana', 'Datadog', 'Azure Monitor'] }
    ],
    cta: {
      label: 'Review Your Infrastructure',
      sub: 'Bring the current architecture and the constraint you are working against.'
    },
    seoTitle: 'Cloud Consulting and Infrastructure Modernization | Linkosys',
    seoDescription:
      'Cloud migration, infrastructure as code, DevOps and reliability engineering for government and enterprise workloads on AWS, Azure and Google Cloud.'
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    headline: 'Security built into how systems are delivered',
    summary: 'Build security into applications, infrastructure and operations.',
    intro:
      'Security added at the end of a project is expensive and rarely holds. We build it into architecture, delivery pipelines and operations, and document it so it can be evidenced during an assessment rather than reconstructed under pressure.',
    problems: [
      {
        problem: 'An assessment or audit is approaching and evidence is scattered',
        response:
          'We map the controls that apply, identify the gaps and produce the artifacts an assessor expects to see.'
      },
      {
        problem: 'Vulnerabilities are found late, in production',
        response:
          'We move scanning and dependency checks into the pipeline so issues surface while the code is still being written.'
      },
      {
        problem: 'Access has accumulated and nobody can say who can reach what',
        response:
          'We review identity and access, apply least privilege and make entitlement reviewable on a schedule.'
      },
      {
        problem: 'There is no tested plan for a security incident',
        response:
          'We define response procedures, assign ownership, and exercise them against a realistic scenario.'
      }
    ],
    capabilities: [
      {
        title: 'Application security',
        description: 'Secure design review, code review, dependency and secrets management in the pipeline.'
      },
      {
        title: 'Cloud and infrastructure security',
        description: 'Network segmentation, hardening, key management and configuration baselines.'
      },
      {
        title: 'Identity and access management',
        description: 'Authentication, authorization, privileged access and periodic entitlement review.'
      },
      {
        title: 'Compliance support',
        description:
          'Control mapping, documentation and remediation planning against the framework that applies to you.'
      },
      {
        title: 'Vulnerability management',
        description: 'Scanning, triage, prioritization by exploitability and verified remediation.'
      },
      {
        title: 'Incident readiness',
        description: 'Response procedures, logging and detection coverage, and tabletop exercises.'
      }
    ],
    approach: [
      { title: 'Establish', description: 'Determine which frameworks and obligations actually apply.' },
      { title: 'Assess', description: 'Measure the current state against those controls and rank the gaps.' },
      { title: 'Remediate', description: 'Fix by risk, and build the control into the delivery process.' },
      { title: 'Evidence', description: 'Produce documentation that stands up to external review.' }
    ],
    technology: [
      { group: 'Application', items: ['SAST', 'DAST', 'SCA', 'Secrets scanning'] },
      { group: 'Identity', items: ['Entra ID', 'Okta', 'SAML', 'OIDC'] },
      { group: 'Platform', items: ['Cloud security posture', 'Endpoint protection', 'SIEM'] },
      { group: 'Frameworks', items: ['NIST CSF', 'NIST SP 800-53', 'CIS Benchmarks', 'ISO 27001'] }
    ],
    cta: {
      label: 'Discuss a Security Requirement',
      sub: 'Tell us the obligation or the finding you need to close.'
    },
    seoTitle: 'Cybersecurity Consulting Services | Linkosys',
    seoDescription:
      'Application, cloud and identity security, vulnerability management, compliance support and incident readiness for government and enterprise organizations.'
  },
  {
    slug: 'it-staffing',
    name: 'IT Staffing',
    headline: 'Technology talent, screened by engineers',
    summary: 'Add specialized technology talent when and where you need it.',
    intro:
      'We place technology professionals into client teams for contract, contract-to-hire and direct placement. Candidates are screened against the actual work by people who have done it, because a resume keyword match is not a qualification.',
    problems: [
      {
        problem: 'A funded role has stayed open for months',
        response:
          'We source against the real requirement and present a short, qualified list rather than volume.'
      },
      {
        problem: 'Candidates pass screening and fail technically',
        response:
          'Technical screening is done by engineers working in the same discipline, against the work the role involves.'
      },
      {
        problem: 'A program needs to scale for a defined period',
        response:
          'We staff for the duration and plan the ramp-down, including handover, at the start rather than the end.'
      },
      {
        problem: 'A prime contract needs specialized skills at short notice',
        response:
          'We support subcontract and teaming arrangements and can staff against defined labour categories.'
      }
    ],
    capabilities: [
      { title: 'Contract staffing', description: 'Specialized engineers for a defined scope or period.' },
      {
        title: 'Contract to hire',
        description: 'Evaluate fit on real work before converting to a permanent role.'
      },
      { title: 'Direct placement', description: 'Permanent hiring for technical and leadership positions.' },
      {
        title: 'Team augmentation',
        description: 'Engineers embedded in your process, tooling and reporting line.'
      },
      {
        title: 'Subcontract support',
        description: 'Staffing to support prime contractors on federal, state and local programs.'
      },
      {
        title: 'Engineer-led screening',
        description: 'Technical evaluation conducted by practitioners in the relevant discipline.'
      }
    ],
    approach: [
      { title: 'Define', description: 'Agree the real requirement, seniority and evaluation criteria.' },
      { title: 'Source', description: 'Search against that definition, not against keywords.' },
      { title: 'Screen', description: 'Technical and situational evaluation before you spend interview time.' },
      { title: 'Support', description: 'Onboarding and ongoing check-ins through the engagement.' }
    ],
    technology: [
      { group: 'Engineering', items: ['Software', 'Data', 'Cloud', 'DevOps', 'QA', 'Security'] },
      { group: 'Delivery', items: ['Business analysis', 'Project management', 'Scrum leadership'] },
      { group: 'Infrastructure', items: ['Systems administration', 'Networking', 'Support engineering'] },
      { group: 'Models', items: ['Contract', 'Contract to hire', 'Direct placement', 'Subcontract'] }
    ],
    cta: {
      label: 'Request Technology Talent',
      sub: 'Send the role and the timeline. We will come back with a qualified shortlist.'
    },
    seoTitle: 'IT Staffing and Staff Augmentation Services | Linkosys',
    seoDescription:
      'Technology staffing and staff augmentation for government and enterprise teams. Contract, contract-to-hire and direct placement with engineer-led technical screening.'
  },
  {
    slug: 'program-management',
    name: 'Project & Program Management',
    headline: 'Complex initiatives, delivered in a structure that holds',
    summary: 'Turn complex technology initiatives into structured, accountable delivery.',
    intro:
      'Large technology programs fail on coordination more often than on engineering. We provide the management layer that keeps scope, dependencies, risk and reporting under control — and that tells you early when something is off track.',
    problems: [
      {
        problem: 'Status is reported as green until it is not',
        response:
          'We report against evidence — completed increments and verified acceptance — rather than percent complete.'
      },
      {
        problem: 'Several vendors are delivering into the same program',
        response:
          'We hold the integrated schedule and dependency map across parties, and manage the seams between them.'
      },
      {
        problem: 'Scope keeps moving and nobody agrees what was agreed',
        response:
          'We maintain a controlled baseline with a change process stakeholders have signed up to.'
      },
      {
        problem: 'Risks are documented but never actually retired',
        response:
          'Each risk gets an owner, a mitigation and a review date, and is worked until it is closed.'
      }
    ],
    capabilities: [
      { title: 'Program management', description: 'Governance, planning and reporting across related projects.' },
      { title: 'Project delivery', description: 'Day-to-day management of scope, schedule, budget and quality.' },
      { title: 'Agile delivery leadership', description: 'Scrum and Kanban leadership, including scaled delivery.' },
      { title: 'Vendor coordination', description: 'Integrated planning across multiple delivery organizations.' },
      { title: 'Risk and issue management', description: 'Identification, ownership, mitigation and closure.' },
      {
        title: 'Business analysis',
        description: 'Requirements, process mapping and acceptance criteria that survive contact with delivery.'
      }
    ],
    approach: [
      { title: 'Baseline', description: 'Establish scope, schedule, budget and the definition of done.' },
      { title: 'Govern', description: 'Set the cadence, decision rights and escalation path.' },
      { title: 'Deliver', description: 'Track against evidence and manage dependencies actively.' },
      { title: 'Close', description: 'Verify acceptance, transition to operations and capture what was learned.' }
    ],
    technology: [
      { group: 'Methods', items: ['Agile', 'Scrum', 'Kanban', 'Hybrid', 'Waterfall'] },
      { group: 'Tooling', items: ['Jira', 'Azure DevOps', 'Microsoft Project', 'Confluence'] },
      { group: 'Governance', items: ['Risk register', 'Change control', 'Earned value reporting'] },
      { group: 'Roles', items: ['Program manager', 'Project manager', 'Scrum leader', 'Business analyst'] }
    ],
    cta: {
      label: 'Discuss Your Program',
      sub: 'Bring the program, the deadline and the part that is not moving.'
    },
    seoTitle: 'Project and Program Management Services | Linkosys',
    seoDescription:
      'Program governance, project delivery, agile leadership, vendor coordination and business analysis for complex government and enterprise technology initiatives.'
  }
]

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug)
