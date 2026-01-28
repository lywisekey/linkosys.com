<template>
  <DefaultLayout>
    <Hero
      :breadcrumbs="[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' }
      ]"
      title="Our Projects"
      subtitle="Explore the impactful digital solutions we’ve delivered across mobile, web, AI, and blockchain platforms."
      :background="bgImage"
    />
    <StickyMenuSection :sections="sectionData" />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import Hero from './components/projects/Hero.vue'
import DefaultLayout from '@/layouts/Default.vue'
import bgImage from '@/assets/images/linkosys/bg/01.jpg'
import OurProjects from './components/projects/OurProjects.vue'
import StickyMenuSection from './components/StickyMenuSection.vue'

import {
  BIconPhone,
  BIconBrowserChrome,
  BIconCpuFill,
  BIconBoxSeam,
  BIconRobot,
  BIconShieldLock
} from 'bootstrap-icons-vue'

const mobileData = {
  sectionTitle: 'Mobile App Development',
  sectionDesc: 'We offer diverse mobile solutions tailored to specific workflows, driving operational efficiency and delivering exceptional user experiences. Every project involves collaborative teamwork, with each member playing a critical role.',
  colg: '6',
  projectList: [
    {
      title: 'POHLA: Bridging Health and Beauty Care Services',
      description: 'POHLA is a smart mobile platform that connects users with health and beauty care services seamlessly.',
      icon: BIconPhone,
      image: '/images/projects/pohla.png'
    },
    {
      title: 'Smart Parking Locator App',
      description: 'A mobile app for Android and iOS that helps users find nearby parking spots quickly and efficiently.',
      icon: BIconPhone,
      image: '/images/projects/smp.jpg'
    },
    {
      title: 'AI‑Powered Street Car Identification App',
      description: 'AI-based mobile app to detect and recognize car license plates in real-time.',
      icon: BIconPhone,
      image: '/images/projects/cari.jpg'
    },
    {
      title: 'Voice‑Driven AI App for Restaurant Reservations',
      description: 'A voice-enabled app with AI integration for making restaurant reservations and ordering food hands-free.',
      icon: BIconPhone,
      image: '/images/projects/airt.jpg'
    }
  ]
}

const webData = {
  sectionTitle: 'Web Application Development',
  sectionDesc: 'We build robust and scalable web platforms that enhance your digital presence and streamline business operations.',
  colg: '4',
  projectList: [
    {
      title: 'Genuine Skin Care E‑Commerce Website',
      description: 'An e-commerce platform developed for Skincarestory USA to showcase and sell skincare products.',
      icon: BIconBrowserChrome,
      image: '/images/projects/ski.png'
    },
    {
      title: 'Online Warehouse Management System',
      description: 'A web-based inventory management system tailored for retail and logistics businesses.',
      icon: BIconBrowserChrome,
      image: '/images/projects/onl-house.png'
    },
    {
      title: 'Law Firm Website for Injury & Immigration',
      description: 'A professional website for a law firm specializing in personal injury and immigration services.',
      icon: BIconBrowserChrome,
      image: '/images/projects/pia.png'
    },
    {
      title: 'Nature Conservation & Development Center',
      description: 'An informative site developed for the Center for Nature Conservation and Development (CCD).',
      icon: BIconBrowserChrome,
      image: '/images/projects/ccd.png'
    },
    {
      title: 'LKC: Worldwide Chemical Supplier & Distributor',
      description: 'Linko Chemical (LKC) is a comprehensive chemical distributor offering a wide range of solutions globally.',
      icon: BIconBrowserChrome,
      image: '/images/projects/lkc.jpg'
    },
    {
      title: 'Legal Services Website for Immigration and Personal Injury',
      description: 'Dinh Law Firm offers expert legal care in immigration and personal injury cases across the U.S.',
      icon: BIconBrowserChrome,
      image: '/images/projects/dlw.png'
    },
    {
      title: 'San Antonio Personal Injury Lawyers: Helping the Injured',
      description: 'DANG TRINH & DINH is a leading personal injury law firm serving San Antonio and beyond.',
      icon: BIconBrowserChrome,
      image: '/images/projects/dtd.png'
    },
    {
      title: 'Uniting to Combat the COVID‑19 Epidemic',
      description: 'RR Orillaza spearheads community support initiatives in the Philippines during the COVID‑19 pandemic.',
      icon: BIconBrowserChrome,
      image: '/images/projects/rr.jpg'
    }
  ]
}

const aiData = {
  sectionTitle: 'AI Solutions',
  sectionDesc: 'We develop intelligent solutions powered by AI to automate processes, enhance analytics, and drive smart user interactions.',
  colg: '6',
  projectList: [
    {
      title: 'AI‑Powered Street Car Identification App',
      description: 'A computer vision-based mobile solution for license plate recognition on vehicles.',
      icon: BIconRobot,
      image: '/images/projects/cari.jpg'
    },
    {
      title: 'Voice‑Driven AI App for Restaurant Reservations',
      description: 'An AI-integrated voice application to assist users in making reservations and ordering in restaurants.',
      icon: BIconCpuFill,
      image: '/images/projects/airt.jpg'
    }
  ]
}

const blockchainData = {
  sectionTitle: 'Blockchain Projects',
  sectionDesc: 'We create secure, transparent, and decentralized systems using blockchain technology and smart contracts.',
  colg: '4',
  projectList: [
    {
      title: 'Product Traceability & Production Management',
      description: 'A blockchain platform for supply chain transparency and production tracking.',
      icon: BIconBoxSeam,
      image: '/images/projects/bctp.jpg'
    },
    {
      title: 'Blockchain in Peer‑to‑Peer Transportation',
      description: 'Integration of blockchain into an existing peer-to-peer transportation platform to ensure data integrity.',
      icon: BIconShieldLock,
      image: '/images/projects/lbbl.jpg'
    },
    {
      title: 'Online Gameshow TV Voting (In Progress)',
      description: 'A blockchain-powered voting system designed for television gameshows to ensure transparency and fairness.',
      icon: BIconBoxSeam,
      image: '/images/projects/blgtv.jpg'
    }
  ]
}

const sectionData = [
  {
    id: 'mobile',
    title: 'Mobile Applications',
    component: {
      render() {
        return h(OurProjects, mobileData)
      }
    }
  },
  {
    id: 'webapp',
    title: 'Web Applications',
    component: {
      render() {
        return h(OurProjects, webData)
      }
    }
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    component: {
      render() {
        return h(OurProjects, aiData)
      }
    }
  },
  {
    id: 'blockchain',
    title: 'Blockchain Projects',
    component: {
      render() {
        return h(OurProjects, blockchainData)
      }
    }
  }
]
</script>