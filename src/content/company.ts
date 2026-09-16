import type { Credential } from './types'

export const contact = {
  office: 'Head Office — California, USA',
  address: '100 Spectrum Center Dr, Irvine, California, USA',
  phone: '+1 949 354 4225',
  phoneHref: 'tel:+19493544225',
  email: 'info@linkosys.com',
  emailHref: 'mailto:info@linkosys.com'
}

/**
 * Credentials the company publishes itself, each backed by a scanned document
 * already hosted on this site. Anything without that backing carries
 * `verify: true` and renders a visible marker — a government buyer acting on a
 * wrong contract number is a far worse outcome than an obvious gap.
 */
export const credentials: Credential[] = [
  {
    label: 'GSA Multiple Award Schedule',
    value: '47QTCA21D004X',
    detail: 'Federal contract vehicle. Contract summary document on file.'
  },
  {
    label: 'California CMAS',
    value: 'Contract number to confirm',
    detail: 'California Multiple Award Schedule. Ordering instructions and terms on file.',
    verify: true
  },
  {
    label: 'Incorporation',
    value: 'Linkosys Inc., California',
    detail: 'Authorized to transact business in Virginia by certificate of authority.'
  },
  {
    label: 'Better Business Bureau',
    value: 'A+ accreditation',
    detail: 'Accredited business rating.'
  },
  {
    label: 'Unique Entity ID (SAM.gov)',
    value: 'UEI to confirm',
    detail: 'Replaced DUNS as the federal identifier. Required on capability statements.',
    verify: true
  },
  {
    label: 'CAGE Code',
    value: 'CAGE code to confirm',
    detail: 'Appears in contract documents and federal logistics systems.',
    verify: true
  },
  {
    label: 'Primary NAICS Codes',
    value: 'NAICS codes to confirm',
    detail: 'Used by contracting officers to match capability to solicitations.',
    verify: true
  },
  {
    label: 'Socio-economic Status',
    value: 'Certifications to confirm',
    detail: 'Small business and any set-aside designations held, as registered in SAM.gov.',
    verify: true
  }
]

export const verifiedCredentials = credentials.filter((entry) => !entry.verify)

/** Capability areas as a government or prime buyer scans for them. */
export const governmentCapabilities = [
  'Software engineering and application modernization',
  'Data engineering, analytics and applied AI',
  'Cloud migration and infrastructure modernization',
  'Cybersecurity and compliance support',
  'IT staffing and staff augmentation',
  'Project and program management',
  'Systems integration',
  'Help desk and application support'
]

export const primePartnership = {
  headline: 'Working with prime contractors',
  body: 'We support prime contractors as a subcontractor and teaming partner — providing engineering capacity, specialized skills and staffing against defined labour categories. We can respond to teaming requests, provide past performance information on request, and support proposal development.',
  points: [
    'Subcontract and teaming arrangements',
    'Staffing against defined labour categories',
    'Engineering capacity for active task orders',
    'Proposal and capture support'
  ]
}

export const approach = [
  {
    title: 'Understand the constraint first',
    description:
      'Before proposing a solution we establish what is actually limiting the outcome — technical, operational or organizational. It is frequently not what the initial brief describes.'
  },
  {
    title: 'Deliver in increments that can be verified',
    description:
      'Work is broken into stages that produce something reviewable. Progress is reported against completed, accepted increments rather than percentage estimates.'
  },
  {
    title: 'Build for the team that inherits it',
    description:
      'Systems are documented, tested and handed over so the client organization can operate and extend them without depending on us indefinitely.'
  },
  {
    title: 'Say when something is off track',
    description:
      'Schedule and scope risks are raised while there is still room to respond. Late surprises cost far more than uncomfortable early conversations.'
  }
]
