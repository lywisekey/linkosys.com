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
    name: 'Contact us',
    link: 'contact.v1'
  },
  {
    name: 'Career',
    link: 'career',
    badge: '2 Job'
  },
  {
    name: 'Career detail',
    link: 'career.single'
  },
  {
    name: 'Become a partner',
    link: 'contact.v1'
  },
  {
    name: 'Sign in',
    link: 'auth.sign-in'
  },
  {
    name: 'Sign up',
    link: 'auth.sign-up'
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
    link: 'faqs'
  },
  {
    name: 'Privacy Policy'
  },
  {
    name: 'News and blogs',
    link: 'blog.grid'
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

export const footerQuickLinks3: FooterLinkType[] = [

  {
    name: 'Contact us',
    link: 'contact.v1'
  },
  {
    name: 'Services',
    link: 'services.v1'
  },
  {
    name: 'Career',
    link: 'career',
    badge: '2 Job'
  },
  {
    name: 'Career detail',
    link: 'career.single'
  },
  {
    name: 'Case studies',
    link: 'portfolio.showcase'
  },
  {
    name: 'Team',
    link: 'pages.team'
  }
]

export const footerCommunityLinks3 = [
  {
    title: 'Documentation',
    icon: BIconFileEarmarkTextFill,
    variant: 'bg-warning'
  },
  {
    title: 'Snippets',
    icon: BIconStickiesFill,
    variant: 'bg-success'
  },
  {
    title: 'Components',
    icon: BIconPuzzleFill,
    variant: 'bg-info'
  }
]

export const quickLinks6: FooterLinkType[] = [

  {
    name: 'Contact us',
    link: 'contact.v1'
  },
  {
    name: 'Career',
    link: 'career'
  },
  {
    name: 'Career detail',
    link: 'career.single'
  },
  {
    name: 'Become a partner',
    link: 'contact.v1'
  },
  {
    name: 'Sign up',
    link: 'auth.sign-up'
  },
  {
    name: 'Cookie'
  }
]
