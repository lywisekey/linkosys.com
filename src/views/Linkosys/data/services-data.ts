import client1 from '@/assets/images/client/01.svg'
import client2 from '@/assets/images/client/02.svg'
import client3 from '@/assets/images/client/03.svg'
import client4 from '@/assets/images/client/04.svg'
import client5 from '@/assets/images/client/05.svg'
import client6 from '@/assets/images/client/06.svg'
import avatar4 from '@/assets/images/avatar/04.jpg'
import avatar5 from '@/assets/images/avatar/05.jpg'
import avatar6 from '@/assets/images/avatar/06.jpg'
import avatar10 from '@/assets/images/avatar/10.jpg'
import avatar11 from '@/assets/images/avatar/11.jpg'
import type { ServiceType, StatisticType, StepType, UserType } from '@/types'
import {
  businessIcon,
  businessIcon2,
  designIcon,
  marketingIcon,
  strategicIcon,
  taxIcon
} from '@/assets/data/icons'

import { BIconLayoutWtf, BIconCreditCard, BIconHeadset, BIconCurrencyExchange, BIconCrosshair, BIconPeople, BIconLink45deg, BIconPhoneFlip } from 'bootstrap-icons-vue'


export const dataServices: ServiceType[] = [
  {
    title: 'Advisory Services',
    description:
      "Because of our extensive delivery experience, we develop strategies that we know can be implemented. Our consultants stay current with their skill sets thanks to our deep data heritage, industry experience, and thought leadership, so they can work with customers to build roadmaps to maintain and maximize the value of their data.",
    image: 'ai/machine-learning.jpg'
  },
  {
    title: 'Consulting Services',
    description:
      'We have created a number of tools and frameworks that improve technology adoption and accelerate delivery by leveraging our extensive data experience. Our consulting team also has hands-on experience with a variety of analytical tools. We can provide unbiased advice on the best solution for your organisation.',
    image: 'ai/nlp.jpg'
  },
  {
    title: 'Managed Services',
    description:
      "Provides a comprehensive set of tailored services while also ensuring data security.",
    image: 'ai/speech.jpg'
  }
]

export const aiServices: ServiceType[] = [
  {
    title: 'Machine Learning',
    description:
      "We use supervised and unsupervised machine learning to create intelligent systems that make sound decisions with little or no human intervention. Our machine learning services are customized to your specific requirements and business objectives.",
    image: 'ai/machine-learning.jpg'
  },
  {
    title: 'Natural Language Processing',
    description:
      'We specialize in text classification, sentiment analysis, document summarization, and other natural language processing tasks. The majority of our artificial intelligence services are built on large language models based on transformer architecture.',
    image: 'ai/nlp.jpg'
  },
  {
    title: 'Speech Recognition',
    description:
      "AI can be used to create sophisticated voice recognition platforms. We use natural language processing and deep learning systems to improve customer experience by assisting you in understanding human speech with greater accuracy.",
    image: 'ai/speech.jpg'
  },
  {
    title: 'Chatbots',
    description:
      'AI can be used to build powerful chatbots that handle customer support, sales inquiries, or other real-time interactions by phone or text. These bots can process natural language inputs and provide answers or initiate tasks based on the data they have access to.',
    image: 'ai/chatbot.jpg'
  },
  {
    title: 'Face Detection & Recognition',
    description: 'In images or videos, AI can detect and recognize human faces. We have extensive experience with facial detection algorithms for security purposes, such as detecting individuals in crowds and detecting faces in surveillance footage, among other things.',
    image: 'ai/face.jpg'
  },
  {
    title: 'Enterprise App Development',
    description:
      "Leverage digital technologies with our talented team that has in-depth knowledge of enterprise mobility solutions, complex security systems and large data sources.",
    image: 'ai/code.jpg'
  }
]
export const mobileServices: ServiceType[] = [
  {
    title: 'App Prototyping & Strategy',
    description:
      "Design thinking helps us conduct preliminary visualization of a working product and to give a lucrative look and feel of the entire design. With app prototyping we test how customers use and react to the overall UX design to obtain maximum ROI.",
    icon: businessIcon
  },
  {
    title: 'Robotics Process Automation (RPA)',
    description:
      'RPA is a methodology for automating enterprise business processes. Robots can be taught to automate complex tasks by mimicking human behavior based on previous job performance. We are experts at modifying existing IT systems and developing new ones with RPA.',
    icon: strategicIcon
  },
  {
    title: 'Hybrid Apps Development',
    description:
      "We provide Hybrid Application Design, development, testing and maintenance to our clients. Few benefits of hybrid apps are that it reduces the cost of development, instantly ready to use, provides best of both worlds, offline access, easy maintenance and much more.",
    icon: marketingIcon
  },
  {
    title: 'Progressive Web Apps',
    description:
      'Much reliable and capable apps that are easily installable by anyone, anywhere, at any device, thereby, providing our clients with latest web features and unique user experience.',
    icon: designIcon
  },
  {
    title: 'Full Stack Mobile App Development',
    description: 'We have a highly efficient team of developers capable of handling multiple devices and platforms. They can perform frontend development, backend development and integrations.',
    icon: businessIcon2
  },
  {
    title: 'Enterprise App Development',
    description:
      "Leverage digital technologies with our talented team that has in-depth knowledge of enterprise mobility solutions, complex security systems and large data sources.",
    icon: taxIcon
  }
]

export const list: string[] = [
  'Create 50+ unique sections',
  'Very easy customization',
  'Super fast loading speed',
  'Fully responsive on any devices'
]

export const counter: StatisticType[] = [
  {
    title: 'Happy Customers',
    number: 600,
    prefix: '+',
    description: 'Happy Customers'
  },
  {
    title: 'Acquired Users',
    number: 200,
    prefix: '+',
    description: 'Acquired Users'
  },
  {
    title: 'Positive User Reviews',
    number: 10,
    prefix: 'K+',
    description: 'Positive User Reviews'
  },
  {
    title: 'Completed Projects',
    number: 25,
    prefix: '+',
    description: 'Completed Projects'
  }
]


export const commitment: ServiceType[] = [
  
  {
    title: 'Efficient contemporary IT solutions.',
    description: 'Aiding applications through innovative modern technologies, our services align with your business goals, stakeholder satisfaction, and operational efficiency.',
    icon: BIconLayoutWtf,
  },
  {
    title: 'Competitive Pricing',
    description: 'Our exceptional service and top-notch products at incredibly low prices drive increased orders.',
    icon: BIconCreditCard,
  },
  
  {
    title: 'Consultation at No Cost',
    description: 'We provide free expert advice from our extensive experience.',
    icon: BIconHeadset,
  },
  {
    title: 'Save Clients’ Time and Money',
    description: 'Choose us for reliable partnership, saving both time and money.',
    icon: BIconCurrencyExchange,
  },
  {
    title: 'Fast and Easy Payment',
    description: 'Choose your payment method: cash, bank transfer, or online payment through your account.',
    icon: BIconCrosshair,
  },
  {
    title: 'Serving customers wholeheartedly and thoughtfully',
    description: 'You will be extremely satisfied and delighted with our professional, dedicated, and attentive service.',
    icon: BIconPeople,
  }
]


export const lists = {
  list1: [
    'Strategic Call-to-Actions',
    'Content-Rich Sections',
    'Social Media Integration',
    'Easy-to-Use Contact Forms'
  ],

  list2: ['Performance Analytics', 'Fast Loading Speed', 'Tested on Major Browsers']
}

export const list2 = ['Performance Analytics', 'Fast Loading Speed', 'Tested on Major Browsers']

export const team: UserType[] = [
  {
    username: 'Samuel Bishop',
    role: 'UI/UX Designer',
    avatar: avatar4
  },
  {
    username: 'Judy Nguyen',
    role: 'Web Designer',
    avatar: avatar11
  },
  {
    username: 'Louis Ferguson',
    role: 'Web Developer',
    avatar: avatar6
  },
  {
    username: 'Dennis Barrett',
    role: 'CEO & Founder',
    avatar: avatar5
  },
  {
    username: 'Bryan Knight',
    role: 'Product Designer',
    avatar: avatar10
  }
]

export const swiper: string[] = [client5, client4, client1, client2, client3, client6]
