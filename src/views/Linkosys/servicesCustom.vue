<template>
  <DefaultLayout>
    <Hero
      :breadcrumbs="[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Artificial Intelligence Services' }
      ]"
      title="Artificial Intelligence Services"
      subtitle="Linkosys provides diverse AI solutions: integrate AI into existing products, develop new ones, or enhance business processes."
      :background="bgImage"
    />
    <!-- Sửa: dùng dấu ":" để truyền đúng object -->
    <StickyMenuSection :sections="sectionData" />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import Hero from './components/services/custom/Hero.vue'
import StickyMenuSection from './components/StickyMenuSection.vue'
import DefaultLayout from '@/layouts/Default.vue'
import OurSolutions from './components/services/OurSolutions.vue'
import Tech from './components/services/Tech.vue'
import bgImage from '@/assets/images/linkosys/bg/01.jpg'

// Icon imports (FontAwesome hoặc tương đương)
import { BIconCodeSquare, BIconPhone, BIconLink, BIconDice6, BIconDiagram3, BIconClouds } from 'bootstrap-icons-vue'

// Dữ liệu demo giải pháp
const custonSolutions = [
  {
    icon: BIconCodeSquare,
    title: 'Web Application Development',
    description: 'Elevate your web development process and craft custom-made web apps that go beyond functionality, driving conversion and revenues.'
  },
  {
    icon: BIconPhone,
    title: 'Mobile App Development',
    description: 'Go where your customers are; go mobile with robust solutions built for your own business. We build native, hybrid, or cross-platform mobile applications that keep users engaged.'
  },
  {
    icon: BIconLink,
    title: 'API Development',
    description: 'Connect your system seamlessly with APIs made for your business. Our API development services simplify integrations, automate workflows, and unlock powerful new features.'
  },
  {
    icon: BIconDice6,
    title: 'Software Integration Services',
    description: 'Create a united technology ecosystem with no data silos, fragmented systems, or process inefficiencies. Our services range from assessing current infrastructure to designing integration strategies and implementing seamless connections.'
  },
  {
    icon: BIconDiagram3,
    title: 'Legacy Modernization',
    description: 'Overhaul and revitalize your outdated software systems with modern tech stacks and our customization abilities. Our legacy application modernization services enable re-engineering, re-platforming, and transforming old systems into powerful, future-proof ones.'
  },
  {
    icon: BIconClouds,
    title: 'Cloud Development',
    description: 'We build custom cloud-based solutions and migrate legacy systems for all business sizes and industries. Our commitment is rooted in our cloud application development expertise, spanning multi-cloud architectures, serverless applications, and platform integrations.'
  }
]

const tabs = [
  { name: 'frontend', label: 'Frontend' },
  { name: 'backend', label: 'Backend' },
  { name: 'mobile', label: 'Mobile' },
  { name: 'db', label: 'Databases' },
  { name: 'cloud', label: 'Cloud' }
]

const technologies = [
  // Frontend
  { name: 'React', logo: '/images/tech/React.png', link: '#', category: 'frontend' },
  { name: 'Angular', logo: '/images/tech/Angular.png', link: '#', category: 'frontend' },
  { name: 'Vue', logo: '/images/tech/Vuejs.png', link: '#', category: 'frontend' },
  { name: 'HTML5', logo: '/images/tech/HTML5.png', link: '#', category: 'frontend' },
  { name: 'CSS3', logo: '/images/tech/CSS3.png', link: '#', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', logo: '/images/tech/Nodejs.png', link: '#', category: 'backend' },
  { name: 'Python', logo: '/images/tech/Python.png', link: '#', category: 'backend' },
  { name: 'Ruby on Rails', logo: '/images/tech/Ruby-on-Rails.png', link: '#', category: 'backend' },
  { name: 'Java', logo: '/images/tech/Java.png', link: '#', category: 'backend' },
  { name: '.NET', logo: '/images/tech/NET.png', link: '#', category: 'backend' },
  { name: 'Go', logo: '/images/tech/Go.png', link: '#', category: 'backend' },

  // Mobile
  { name: 'Swift', logo: '/images/tech/Swift.png', link: '#', category: 'mobile' },
  { name: 'Kotlin', logo: '/images/tech/Kotlin.png', link: '#', category: 'mobile' },
  { name: 'React Native', logo: '/images/tech/React-Native.png', link: '#', category: 'mobile' },
  { name: 'Flutter', logo: '/images/tech/Flutter.png', link: '#', category: 'mobile' },

  // Database
  { name: 'MySQL', logo: '/images/tech/MySQL.png', link: '#', category: 'db' },
  { name: 'PostgreSQL', logo: '/images/tech/PostgreSQL.png', link: '#', category: 'db' },
  { name: 'MongoDB', logo: '/images/tech/MongoDB.png', link: '#', category: 'db' },
  { name: 'Oracle', logo: '/images/tech/Oracle.png', link: '#', category: 'db' },
  { name: 'MSSql', logo: '/images/tech/MSSql.png', link: '#', category: 'db' },

  { name: 'AWS', logo: '/images/tech/AWS.png', link: '#', category: 'cloud' },
  { name: 'Google Cloud', logo: '/images/tech/Google-Cloud.png', link: '#', category: 'cloud' },
  { name: 'Microsoft Azure', logo: '/images/tech/Microsoft-Azure.png', link: '#', category: 'cloud' },
]
// Truyền component render động
const sectionData = [
  {
    id: 'solutions',
    title: 'Our Solution',
    component: {
      render() {
        return h(OurSolutions, {
          title: 'Our Custom Software Development Solutions',
          description: 'We specialize in various areas of modern software engineering. Get ready to innovate, integrate, and transform with our end-to-end custom software development services.',
          solutions: custonSolutions
        })
      }
    }
  },
  {
    id: 'technologies',
    title: 'Technologies',
    component: {
      render() {
        return h(Tech, {
          title: 'Technologies We Use',
          subtitle: 'We build tailored software solutions in any technology stack you require.',
          tabs,
          technologies
        })
      }
    }
  }
]
</script>