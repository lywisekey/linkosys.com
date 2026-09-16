import type { RouteLocationRaw } from 'vue-router'
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { BIconLightbulb } from 'bootstrap-icons-vue'
import { services } from '@/content/services'
import { contact } from '@/content/company'

export type FooterLinkType = {
  name: string
  to: RouteLocationRaw
}

export const quickLinks: FooterLinkType[] = [
  { name: 'About Linkosys', to: { name: 'company.aboutus' } },
  { name: 'Our Approach', to: { name: 'company.aboutus', hash: '#approach' } },
  { name: 'Leadership & Team', to: { name: 'company.team' } },
  { name: 'Partners & Clients', to: { name: 'company.partners' } },
  { name: 'Case Studies', to: { name: 'case-studies' } },
  { name: 'Insights', to: { name: 'company.blog' } }
]

/**
 * Previously this column held unlinked labels ("Documents", "Privacy Policy") and
 * a link to a `terms-conditions` route that was never defined. Only destinations
 * that exist are listed; the missing legal pages are tracked for the client.
 */
export const communityLinks: FooterLinkType[] = [
  { name: 'Government', to: { name: 'government' } },
  { name: 'Industries', to: { name: 'industries' } },
  { name: 'Solutions', to: { name: 'solutions' } },
  { name: 'Contact', to: { name: 'contact' } }
]

export const footerServices3: FooterLinkType[] = services.map((service) => ({
  name: service.name,
  to: { name: 'services.detail', params: { slug: service.slug } }
}))

export const footerCommunityLinks3 = [
  {
    title: 'Case Studies',
    icon: BIconLightbulb,
    to: { name: 'case-studies' },
    variant: 'bg-warning'
  }
]

export const followOnIcons = [
  { icon: faFacebookF, variant: 'bg-facebook' },
  { icon: faInstagram, variant: 'bg-instagram' },
  { icon: faTwitter, variant: 'bg-twitter' },
  { icon: faLinkedinIn, variant: 'bg-linkedin' },
  { icon: faYoutube, variant: 'bg-youtube' }
]

export const contactDetails = {
  address: contact.address,
  number: contact.phone,
  email: contact.email,
  open: 'Mon - Fri: 09:00 - 21:00',
  close: 'Sat - Sun: Closed'
}
