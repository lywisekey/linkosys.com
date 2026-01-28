<template>
  <DefaultLayout>
    <Hero
      :breadcrumbs="[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Web Application Development' }
      ]"
      title="Web Application Development"
      subtitle="We are your trusted partner for end-to-end web app development services and solutions that cater to diverse demands and accelerate your digital business."
      :background="bgImage"
    />
    <!-- Sửa: dùng dấu ":" để truyền đúng object -->
    <StickyMenuSection :sections="sectionData" />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import Hero from './components/services/web/Hero.vue'
import StickyMenuSection from './components/StickyMenuSection.vue'
import DefaultLayout from '@/layouts/Default.vue'
import OurSolutions from './components/services/OurSolutions.vue'
import Tech from './components/services/Tech.vue'
import bgImage from '@/assets/images/linkosys/bg/01.jpg'

// Icon imports (FontAwesome hoặc tương đương)
import { BIconCodeSquare, BIconIntersect, BIconLink, BIconStackOverflow, BIconPeople, BIconClouds, BIconShieldCheck, BIconUiChecks } from 'bootstrap-icons-vue'

// Dữ liệu demo giải pháp
const custonSolutions = [
  {
    icon: BIconCodeSquare,
    title: 'Web App Consulting',
    description: 'Our consultants bring hands-on experience and solid expertise to guide your project from the ground up. Whether you start from scratch or refine an existing product, we advise on your web application development project, from clarifying specifications and selecting the right technology stack, and tailoring a detailed roadmap.'
  },
  {
    icon: BIconIntersect,
    title: 'UI/UX Design',
    description: 'Our UI/UX design services cater to your web application’s interface design and user experience, encompassing user research, wireframing, prototyping, and visual design. We have expert designers to help you identify UI/UX bottlenecks of your web-based products and provide guidance for actionable improvements.'
  },
  {
    icon: BIconLink,
    title: 'API & Third-Party Integrations',
    description: 'Modern web applications thrive on seamless integrations. We build custom APIs for integration with external services, systems, and cloud platforms. Our professionals can ensure secure data exchange, smooth functionality, and effortless automation for a frictionless user experience.'
  },
  {
    icon: BIconClouds,
    title: 'DevOps & Cloud Infrastructure',
    description: 'We harness the power of DevOps and cloud technologies to optimize your web application development process for rapid deployments, minimal downtime, and cost-effective infrastructure management. Our offerings include CI/CD pipelines, containerization with Docker and Kubernetes, microservice architectures, and collaborative workflows.'
  },
  {
    icon: BIconStackOverflow,
    title: 'Full-Cycle Web App Development',
    description: 'We provide you with our full-stack web application development services for projects across industries. Our streamlined process covers and secures every phase, from planning, architecture design, front-end and back-end development, and API integrations to QA testing, deployment, and maintenance. We adopt agile methodologies and the latest tech stacks to bring your visionary product to life.'
  },
  {
    icon: BIconPeople,
    title: 'Dedicated Web App Development Team',
    description: 'Accelerate your development process with our dedicated team. We introduce you to Orient’s pool of top-tier talent in Vietnam. Whether it is on a short- or long-term basis, our flexible engagement models ensure you get the right expertise and talent, including software engineers, designers, QA specialists, project managers, etc., in your preferred approach.'
  },
  {
    icon: BIconUiChecks,
    title: 'Web App Modernization & Optimization',
    description: 'We revamp legacy systems and outdated web applications for optimal performance, scalability, and security. Our professionals conduct in-depth audits, refactor codebases, upgrade architectures, and offer recommendations on how to modernize your web app’s design and optimize its performance.'
  },
  {
    icon: BIconShieldCheck,
    title: 'Security & Compliance',
    description: 'At Orient Software, we adopt a security-first mindset at every stage of web app development and guarantee full compliance with the latest industry standards like GDPR, HIPAA, and ISO 27001. We implement multiple layers of security and have robust protocols, such as data encryption, secure authentication, access controls, and regular vulnerability assessments, to safeguard your web-based solutions against evolving cyber threats and regulatory risks.'
  }

]

const tabs = [
  { name: 'frontend', label: 'Frontend' },
  { name: 'backend', label: 'Backend' },
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
          title: 'Our Web Application Development Services',
          description: 'As a full-service partner, we cover all aspects of web application development. We offer a complete suite of services and solutions tailored for each specific client and their unique business challenges and requirements.',
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