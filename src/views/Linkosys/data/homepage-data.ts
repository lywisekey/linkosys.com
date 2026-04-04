import awardImg1 from '@/assets/images/awards/4by3/01.png'
import awardImg2 from '@/assets/images/awards/4by3/02.png'
import awardImg3 from '@/assets/images/awards/4by3/03.png'
import awardImg4 from '@/assets/images/awards/4by3/04.png'
import imagePop1 from '@/assets/images/awards/commonwealth-paper.jpg'
import imagePop2 from '@/assets/images/awards/gsa-paper.jpg'
import imagePop3 from '@/assets/images/awards/dgs-paper.jpg'

import serviceImg1 from '@/assets/images/services/4by3/01.jpg'
import serviceImg2 from '@/assets/images/services/4by3/02.jpg'
import serviceImg3 from '@/assets/images/services/4by3/03.jpg'
import serviceImg4 from '@/assets/images/services/4by3/04.jpg'
import serviceImg5 from '@/assets/images/services/4by3/05.jpg'
import serviceImg6 from '@/assets/images/services/4by3/06.jpg'
import serviceImg7 from '@/assets/images/services/4by3/07.jpg'
import serviceImg8 from '@/assets/images/services/4by3/08.jpg'


import blogImg3 from '@/assets/images/blog/4by3/03.jpg'
import blogImg7 from '@/assets/images/blog/4by3/07.jpg'
import blogImg8 from '@/assets/images/blog/4by3/08.jpg'

import project1 from '@/assets/images/portfolio/list/02.jpg'
import project2 from '@/assets/images/portfolio/list/03.jpg'

import avatar2 from '@/assets/images/avatar/02.jpg'
import avatar4 from '@/assets/images/avatar/04.jpg'
import avatar5 from '@/assets/images/avatar/05.jpg'
import avatar6 from '@/assets/images/avatar/06.jpg'
import avatar9 from '@/assets/images/avatar/09.jpg'

import { BIconBullseye, BIconHeadset, BIconRocketTakeoff, BIconSearch } from 'bootstrap-icons-vue'
import type {
  BlogType,
  ProjectType,
  ServiceType,
  awardType,
  StatisticType,
  StepType,
  TestimonialType
} from '@/types'

export const awards: awardType[] = [
  {
    title: 'The certificate of authority to transact business in Virginia',
    description: 'This is to certificate that a certificate of authority to transact business in Virginia was this day issued and admitted to record in this office for LINKOSYS INC.&nbsp;a corporation under the laws of California and that the said corporation is authorized to transact business in Virginia, subject to all Virginia laws applicable to the corporation and its business. Clerks of the Commission: Signed.',
    image: awardImg1,
    imagepop: imagePop1,
  },
  {
    title: 'Contract Summary Document',
    description: 'Company Name: LINKOSYS; Duns Number: 0044771419; Contract Number: 47QTCA21D004X',
    image: awardImg2,
    imagepop: imagePop2,
  },
  {
    title: 'Multiple Award Schedule',
    description: 'The most current Ordering Instructions and Special Provisions, CMAS Terms and Conditions, and products and/or services are included herein. All purchase orders issued by State agencies shall incorporate these Ordering Instructions and Special Provisions and CMAS Terms and Conditions.<br /><br />Agency non-compliance with the requirements may result in the loss of delegated authority to use the CMAS program.<br /><br />CMAS contractor non-compliance with the requirements may result in termination.',
    image: awardImg3,
    imagepop: imagePop3,
  },
  {
    title: 'A+ Accreditation from Better Business Bureau (BBB)',
    description: 'The BBB helps people find businesses they can trust.',
    image: awardImg4,
    link: "https://www.bbb.org/"
  }
  
]

export const services: ServiceType[] = [
  
  {
    title: 'Custom Software Development',
    description: 'Tailored solutions for your unique business challenges.',
    image: serviceImg7,
    route: { name: 'services.custom' }
  },
  {
    title: 'Data and Analytics',
    description: 'We assist organizations in developing and implementing robust enterprise data management strategies.',
    image: serviceImg8,
    route: { name: 'services.data' }
  },
  
  {
    title: 'Mobile Application Development',
    description: 'Cross-platform apps to engage your customers anywhere.',
    image: serviceImg1,
    route: { name: 'services.mobile' }
  },
  {
    title: 'Web Development & Design',
    description: 'Modern, responsive, and high-converting websites.',
    image: serviceImg2,
    route: { name: 'services.webapp' }
  },
  {
    title: 'Artificial Intelligence',
    description: 'Unlock insights and drive smarter decisions.',
    image: serviceImg3,
    route: { name: 'services.ai' }
  },
  {
    title: 'Blockchain Development',
    description: 'Build secure, decentralized solutions that transform processes and drive innovation.',
    image: serviceImg4,
    route: { name: 'services.blockchain' }
  }
]

export const steps: StepType[] = [
  {
    title: 'Discovery and Consultation',
    description: 'We begin by getting to know your unique requirements, goals, and challenges.',
    icon: BIconSearch
  },
  {
    title: 'Planning and Strategy',
    description: 'We define project milestones and deliverables to keep the process on track.',
    icon: BIconBullseye
  },
  {
    title: 'Deployment and Launch',
    description:
      'We ensure a smooth transition to the live, providing support every step of the way.',
    icon: BIconRocketTakeoff
  },
  {
    title: 'Support and Maintenance',
    description: 'We offer ongoing support and maintenance services to keep your software running.',
    icon: BIconHeadset
  }
]

export const projects: ProjectType[] = [
  {
    name: 'Website optimization for techWave',
    category: 'Graphic design',
    image: project1,
    route: { name: 'commingsoon' }
  },
  {
    name: 'Transforming ideas into reality',
    category: 'UI/UX design',
    image: project2,
    route: { name: 'commingsoon' }
  }
]

export const statData: StatisticType[] = [
  {
    title: 'Worldwide client',
    number: 30,
    prefix: '>',
    suffix: 'K'
  },
  {
    title: 'Analyze business reports',
    number: 99,
    suffix: '%'
  },
  {
    title: 'Worldwide projects',
    number: 350,
    suffix: '+'
  }
]

export const testimonials: TestimonialType[] = [
  {
    title: "Transformed My Agency's Results",
    comment:
      'Linkosys addresses our needs through diverse perspectives, listens attentively, and swiftly delivers innovative and efficient solutions.',
    rating: 4.5,
    user: {
      firstName: 'Michael',
      lastName: 'Darmawan',
      role: 'President Eleganza Tiles',
      avatar: avatar4
    }
  },
  {
    title: "Transformed My Agency's Results",
    comment:
      'When the day concluded, we were tasked with customer surveys and providing e-commerce site development quotes. Despite needing the information by the next afternoon, Linkosys promptly initiated the work upon my call.',
    rating: 4.5,
    user: {
      firstName: 'Hoang',
      lastName: 'Trinh',
      role: 'CEO Advanced Network Consulting, Inc',
      avatar: avatar5
    }
  },
  {
    title: "Transformed My Agency's Results",
    comment:
      'Linkosys is our esteemed partner with a team of skilled, experienced, and accountable experts.',
    rating: 4.5,
    user: {
      firstName: 'Jessey ',
      lastName: 'Lee',
      role: 'CHAIRMAN AND FOUNDER BRESATECH',
      avatar: avatar6
    }
  }
]
