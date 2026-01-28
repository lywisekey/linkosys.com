import type { BSIconType, FeatureType, PartnerType } from '@/types'
import { BIconHandIndexFill, BIconHearts, BIconCloudCheckFill, BIconHandIndex, BIconBoxes, BIconDiagram3, BIconPeople, BIconShieldFillCheck } from 'bootstrap-icons-vue'

import client0 from '@/assets/images/client/stixis-logo.png'
import client01 from '@/assets/images/client/letcore.png'
import client02 from '@/assets/images/client/trancreative_square_blue.svg'
import client1 from '@/assets/images/client/anc-logo.png'
import client2 from '@/assets/images/client/bresatech-logo.png'
import client3 from '@/assets/images/client/fat-logo.png'
import client4 from '@/assets/images/client/itms-logo.png'
import client5 from '@/assets/images/client/sonypicture-logo.png'
import client6 from '@/assets/images/client/cyber-eye.webp'


type FeaturesType = {
  title1: string
  icon1: BSIconType
  description1: string
} & FeatureType


export const whychoose: FeaturesType[] = [
  {
    icon: BIconCloudCheckFill,
    title: 'Proven Expertise',
    description: 'Decades of experience delivering complex IT solutions.',
    icon1: BIconHandIndexFill,
    title1: 'Tailored Collaboration',
    description1: 'Flexible partnership models to suit your goals.'
  },
  {
    icon: BIconHearts,
    title: 'Innovation at Heart',
    description: 'We embrace new technologies to stay ahead.',
    icon1: BIconShieldFillCheck,
    title1: 'Commitment to Success',
    description1: 'Transparent, proactive, and results-driven.'
  }
]

export const partners: PartnerType[] = [
  {
    title: 'IT Solutions and Services',
    description:
      'Founded in 2017, Bresatech delivers exceptional IT solutions across sectors. The steady growth, innovation, and partnerships with industry leaders like NetSuite and Pegasystems keep Bresatech at the forefront of technology.',
    image: client2,
    link: "https://www.bresatech.com/"
  },
  {
    title: 'Tran Creative',
    description:
      'Founded in 2006, Tran Creative has won 158 American Advertising Awards with the numbers growing each year. Over 80 logos designed by Tran Creative are published in international design books. See it next time you visit Barnes & Noble.',
    image: client02,
    link: "https://tran-creative.com/"
  },
  {
    title: 'Stixis Technologies',
    description:
      'Our cross-industry expertise gives us exceptional ability to analyze client\'s business requirements & determine how the client can benefit from using our services and us as a Strategic Partner.',
    image: client0,
    link: "https://stixis.com"
  },
  {
    title: 'Leet Core',
    description:
      'THE LEET PURPOSE to fundamentally change the way organizations approach cyber security, based on three key principles',
    image: client01,
    link: "#"
  },
  {
    title: 'Cyber Eye',
    description:
      'Established in 2016, Cyber Eye creates the AX tech ecosystem, tackles complex data challenges for businesses, and fosters community value-sharing.',
    image: client6,
    link: "https://cybereye.vn/"
  },
  {
    title: 'Advanced Network Consulting',
    description:
      'Founded in 2004, Advanced Network Consulting is a technology firm that drives clients\' success through innovative design, installation, support, and security services. With 17+ years of experience, we empower individuals, government, and businesses.',
    image: client1,
    link: "https://ancsweb.com/"
  },
  {
    title: 'First American Financial Corporation',
    description:
      'First American Financial Corporation is an American financial services company which provides title insurance and settlement services to the real estate and mortgage industries.',
    image: client3,
    link: "#"
  },
  {
    title: 'ITMS',
    description:
      'ITMS believes in the inevitable shift to the cloud because cloud computing and cloud concepts represent a significant trend with the potential to increase agility, lower costs and increase competitive advantage.',
    image: client4,
    link: "http://www.itmsinc.com/"
  },
  {
    title: 'Sony Pictures',
    description:
      'Sony Pictures Entertainment Inc., formerly Columbia Pictures Entertainment, Inc., is an American diversified multinational mass media and entertainment studio conglomerate that produces, acquires, and distributes filmed entertainment through multiple platforms.',
    image: client5,
    link: "#"
  }
]
