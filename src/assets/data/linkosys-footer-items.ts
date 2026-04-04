import type { BSIconType } from '@/types'
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import {
  BIconBoxArrowUpRight,
  BIconLightbulb,
  BIconFileEarmarkTextFill,
  BIconPuzzleFill,
  BIconStickiesFill
} from 'bootstrap-icons-vue'

type FooterLinkType = {
  name: string
  link?: string
  badge?: string
  icon?: BSIconType
}

export const quickLinks: FooterLinkType[] = [
  {
    name: 'About Us',
    link: 'company.aboutus'
  },
  {
    name: 'Team',
    link: 'company.team'
  },
  {
    name: 'Partners & Main Clients',
    link: 'company.partners',
    badge: '2 Job'
  },
  {
    name: 'Blog',
    link: 'company.blog'
  }
]

export const communityLinks: FooterLinkType[] = [
  {
    name: 'Documents'
  },
  {
    name: 'Supports',
    icon: BIconBoxArrowUpRight
  },
  {
    name: 'Faqs',
    link: 'commingsoon'
  },
  {
    name: 'Privacy Policy'
  },
  {
    name: 'News and blogs',
    link: 'commingsoon'
  },
  {
    name: 'Terms & condition',
    link: 'terms-conditions'
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
  address: '100 Spectrum Center Dr, Irvine, California - USA',
  number: '+1 949 354 4225',
  email: 'Info@linkosys.com',
  open: 'Mon - Fri: 09:00 - 21:00',
  close: 'Sat - Sun: Closed'
}

export const footerServices3: FooterLinkType[] = [
  {
    name: 'Custom Software Development',
    link: 'services.custom'
  },
  {
    name: 'Mobile App Development',
    link: 'services.mobile'
  },
  {
    name: 'Web-App Development',
    link: 'services.webapp'
  },
  {
    name: 'Artificial Intelligence',
    link: 'services.ai',
    badge: 'new'
  },
  {
    name: 'Blockchain Development',
    link: 'services.blockchain',
  },
  {
    name: 'Data & Analytics',
    link: 'services.data',
  }
]

export const footerCommunityLinks3 = [
  {
    title: 'Awesome Works',
    icon: BIconLightbulb,
    link: "projects",
    variant: 'bg-warning'
  }
]

