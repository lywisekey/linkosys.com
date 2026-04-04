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
import Hero from './components/services/mobile/Hero.vue'
import StickyMenuSection from './components/StickyMenuSection.vue'
import DefaultLayout from '@/layouts/Default.vue'
import OurSolutions from './components/services/OurSolutions.vue'
import Tech from './components/services/Tech.vue'
import bgImage from '@/assets/images/linkosys/bg/01.jpg'

// Icon imports (FontAwesome hoặc tương đương)
import { BIconApple, BIconAndroid2, BIconLink, BIconBriefcase, BIconDiagram3, BIconIntersect, BIconPhoneFlip, BIconBezier2 } from 'bootstrap-icons-vue'

// Dữ liệu demo giải pháp
const custonSolutions = [
  {
    icon: BIconApple,
    title: 'iOS App Development',
    description: 'Establish a strong digital presence across iOS devices. We design and create apps for Apple\'s ecosystem, encompassing iPhones, iPads, iMacs, Apple watches, Apple TVs, and services like iCloud and App Store. At Orient Software, we integrate the latest Apple features and utilize key SDKs and technologies (Such as Swift, Objective-C, and SwiftUI) for native iOS app development.'
  },
  {
    icon: BIconAndroid2,
    title: 'Android App Development',
    description: 'Reach 3.3+ billion active Android devices. Our team excels in native Android application development, crafting from basic mobile software to complex solutions. Orient Software builds scalable, high-performance apps using Java and Kotlin and leverages tools like Android Studio and Jetpack for modern, maintainable code. We optimize mobile apps for seamless user experience and deployment to the Google Play Store.'
  },
  {
    icon: BIconPhoneFlip,
    title: 'Native App Development',
    description: 'Harness the full potential of your target platform. We construct native mobile applications for iOS and Android environments. Our mobile app developers are proficient in platform-specific programming languages, such as Kotlin or Swift, and mobile development technologies. With years of experience, we build native apps that offer peak performance, seamless integration, and access to exclusive features of both iOS and Android platforms.'
  },
  {
    icon: BIconBezier2,
    title: 'Cross-Platform & Hybrid App Development',
    description: 'Attain seamless user experience across multiple platforms. We specialize in cross-platform development – building mobile apps that function flawlessly across diverse environments, such as web browsers, mobile devices, desktop operating systems, IoT, and wearable devices. We also build hybrid apps that combine the best of the website and native technologies.'
  },
  {
    icon: BIconBriefcase,
    title: 'Enterprise Mobility Solutions',
    description: 'Accelerate your business growth through streamlined collaboration, smart automation, and high-level security. Beyond mobile app development, Orient Software provides you with strategic expertise for a comprehensive mobile strategy that enables an enterprise to efficiently control business-critical mobile devices and manage its workforce, operations, and data. We tailor business-driven solutions to your specific requirements.'
  },
  {
    icon: BIconIntersect,
    title: 'Mobile UI/UX Design',
    description: 'Deliver intuitive user experience and fluid interactions. Orient\'s UI/UX design services help you with your mobile app design makeover or concept revamp. In our user-centric design process, we conduct research to identify your target audience, understand user demands, and define end-user personas before turning rough ideas into wireframes, mockups, and prototypes. We make sure your mobile software looks great and functions flawlessly.'
  }
]

const tabs = [
  { name: 'mobile', label: 'Mobile Development' },
  { name: 'cross', label: 'Cross-Platform' },
  { name: 'backend', label: 'Backend' },
  { name: 'cloud', label: 'Cloud' },
  { name: 'db', label: 'Databases' }
  
]

const technologies = [
  // Frontend
  { name: 'Flutter', logo: '/images/tech/Flutter.png', link: '#', category: 'cross' },
  { name: 'React Native', logo: '/images/tech/React-Native.png', link: '#', category: 'cross' },
  { name: 'Xamarin', logo: '/images/tech/Xamarin.png', link: '#', category: 'cross' },
  
  // Backend
  { name: 'Node.js', logo: '/images/tech/Nodejs.png', link: '#', category: 'backend' },
  { name: 'Python', logo: '/images/tech/Python.png', link: '#', category: 'backend' },
  { name: 'Ruby on Rails', logo: '/images/tech/Ruby-on-Rails.png', link: '#', category: 'backend' },

  // Mobile
  { name: 'Swift', logo: '/images/tech/Swift.png', link: '#', category: 'mobile' },
  { name: 'Kotlin', logo: '/images/tech/Kotlin.png', link: '#', category: 'mobile' },
  { name: 'Java', logo: '/images/tech/Java.png', link: '#', category: 'mobile' },
  { name: 'Dart', logo: '/images/tech/Dart.png', link: '#', category: 'mobile' },
  { name: 'Objective C', logo: '/images/tech/Objective-C.png', link: '#', category: 'mobile' },


  // Database
  { name: 'MySQL', logo: '/images/tech/MySQL.png', link: '#', category: 'db' },
  { name: 'PostgreSQL', logo: '/images/tech/PostgreSQL.png', link: '#', category: 'db' },
  { name: 'MongoDB', logo: '/images/tech/MongoDB.png', link: '#', category: 'db' },

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
          title: 'Our Custom Mobile Application Development Services',
          description: 'Whether you are an early-stage startup or a global enterprise, our deep technical expertise in custom app development and mastery of cutting-edge frameworks ensure your mobile app development project is in our capable hands. From concept and design to development, deployment, and maintenance, we deliver end-to-end solutions that align with your unique business needs.',
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