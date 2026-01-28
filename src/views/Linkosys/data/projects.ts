export interface Project {
  id: string;
  category: string;
  title: string;
  description?: string;
  image?: string;
}

export const projects: Project[] = [
  // Mobile
  { id: 'mobile-pohla', category: 'mobile', title: 'POHLA', description: 'Bridging Health and Beauty Care Services Intelligently' },
  { id: 'mobile-parking', category: 'mobile', title: 'Smart Parking Locator App' },
  { id: 'mobile-car-id', category: 'mobile', title: 'Smart Street Car Identification App' },
  { id: 'mobile-voice-ai', category: 'mobile', title: 'Voice‑Driven AI Mobile App for Restaurant Reservations and Orders' },
  // Web-app
  { id: 'web-genuine-skin', category: 'webapp', title: 'Genuine Skin Care E‑Commerce Website' },
  { id: 'web-warehouse', category: 'webapp', title: 'Online Warehouse Management System' },
  { id: 'web-law-advocacy', category: 'webapp', title: "Personal Injury and Immigration Attorneys’ Advocacy Website" },
  { id: 'web-nature-center', category: 'webapp', title: 'Nature Conservation and Development Center' },
  { id: 'web-lkc', category: 'webapp', title: 'LKC: Worldwide Chemical Supplier & Distributor' },
  { id: 'web-dinh-law', category: 'webapp', title: 'Legal Services Website for Immigration and Personal Injury' },
  { id: 'web-san-antonio-law', category: 'webapp', title: 'San Antonio Personal Injury Lawyers' },
  { id: 'web-covid-community', category: 'webapp', title: 'Uniting to Combat the COVID‑19 Epidemic: Community Assistance' },
  // AI (same as mobile)
  { id: 'ai-car-id', category: 'ai', title: 'Smart Street Car Identification App' },
  { id: 'ai-voice', category: 'ai', title: 'Voice‑Driven AI Mobile App for Restaurant Reservations and Orders' },
  // Blockchain
  { id: 'bc-traceability', category: 'blockchain', title: 'Product Traceability & Production Management via Blockchain' },
  { id: 'bc-peer-transport', category: 'blockchain', title: 'Blockchain for Peer‑to‑Peer Transportation Services' },
  { id: 'bc-gameshow', category: 'blockchain', title: 'Online Gameshow TV Voting Platform' },
];