export interface Project {
  id: string
  category: string
  title: string
  description?: string
}

export interface ProjectGroup {
  key: string
  label: string
  summary: string
}

/**
 * Real delivered projects, unchanged in substance from the list Linkosys already
 * publishes. They are grouped by the capability each one demonstrates rather than
 * by delivery channel ("mobile", "blockchain"), which described the technology
 * used instead of the problem solved and read as an agency portfolio.
 */
export const projectGroups: ProjectGroup[] = [
  {
    key: 'operations',
    label: 'Operations & industrial systems',
    summary: 'Systems that run and record physical operations: inventory, production and traceability.'
  },
  {
    key: 'ai',
    label: 'Applied AI',
    summary: 'Machine learning applied to a specific, measurable task rather than as a demonstration.'
  },
  {
    key: 'public',
    label: 'Public & civic',
    summary: 'Services built for community, public access and civic use.'
  },
  {
    key: 'commercial',
    label: 'Commercial platforms',
    summary: 'Customer-facing platforms for distribution, commerce and professional services.'
  }
]

export const projects: Project[] = [
  // Operations & industrial systems
  {
    id: 'ops-warehouse',
    category: 'operations',
    title: 'Online Warehouse Management System',
    description: 'Inventory, locations, stock movement and order fulfilment in one browser-based system.'
  },
  {
    id: 'ops-traceability',
    category: 'operations',
    title: 'Product Traceability & Production Management',
    description: 'Production genealogy recorded from input materials through to distributed product.'
  },
  {
    id: 'ops-transport',
    category: 'operations',
    title: 'Peer-to-Peer Transportation Services Platform',
    description: 'Coordination and settlement between independent transport participants.'
  },

  // Applied AI
  {
    id: 'ai-voice',
    category: 'ai',
    title: 'Voice-Driven AI Reservations and Ordering',
    description: 'Speech recognition and intent handling for high-volume phone orders.'
  },
  {
    id: 'ai-vehicle',
    category: 'ai',
    title: 'Street Vehicle Identification',
    description: 'Image classification returning vehicle identification from a camera photo.'
  },

  // Public & civic
  {
    id: 'public-covid',
    category: 'public',
    title: 'COVID-19 Community Assistance Platform',
    description: 'Single intake and coordination point for assistance requests and volunteer response.'
  },
  {
    id: 'public-parking',
    category: 'public',
    title: 'Smart Parking Locator',
    description: 'Nearby parking availability and guidance from one map view.'
  },
  {
    id: 'public-nature',
    category: 'public',
    title: 'Nature Conservation and Development Center',
    description: 'Public information and engagement platform for a conservation organization.'
  },
  {
    id: 'public-voting',
    category: 'public',
    title: 'Online Gameshow TV Voting Platform',
    description: 'High-concurrency public voting with auditable vote records.'
  },

  // Commercial platforms
  {
    id: 'com-lkc',
    category: 'commercial',
    title: 'LKC: Worldwide Chemical Supplier & Distributor',
    description: 'Product catalogue and distribution presence for an international supplier.'
  },
  {
    id: 'com-pohla',
    category: 'commercial',
    title: 'POHLA — Health and Beauty Care Services',
    description: 'Service discovery and booking across health and beauty providers.'
  },
  {
    id: 'com-skincare',
    category: 'commercial',
    title: 'Skin Care E-Commerce Platform',
    description: 'Storefront, catalogue and checkout for a direct-to-consumer brand.'
  },
  {
    id: 'com-legal-immigration',
    category: 'commercial',
    title: 'Immigration and Personal Injury Legal Services',
    description: 'Practice websites with intake forms and case enquiry handling.'
  },
  {
    id: 'com-legal-sa',
    category: 'commercial',
    title: 'San Antonio Personal Injury Practice',
    description: 'Practice website and client enquiry workflow.'
  }
]

export const projectsByGroup = (key: string) => projects.filter((p) => p.category === key)
