const setTitle = (pageName?: string) => {
  return pageName
    ? `${pageName} | IT Consulting Company`
    : 'Linkosys | IT Consulting Company'
}


const authRoutes = [
  {
    path: '/auth/sign-in',
    name: 'auth.sign-in',
    meta: {
      title: setTitle('SignIn')
    },
    component: () => import('@/views/pages/auth/SignIn/index.vue')
  },
  {
    path: '/auth/sign-up',
    name: 'auth.sign-up',
    meta: {
      title: setTitle('SignUp')
    },
    component: () => import('@/views/pages/auth/SignUp/index.vue')
  },
  {
    path: '/auth/forgot-password',
    name: 'auth.forgot-password',
    meta: {
      title: setTitle('Forgot Password')
    },
    component: () => import('@/views/pages/auth/ForgotPassword/index.vue')
  }
]

const singleRoutes = [
  {
    path: '/',
    name: 'homepage',
    meta: {
      title: 'Linkosys | IT Consulting Company'
    },
    component: () => import('@/views/Linkosys/homepage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      title: 'Linkosys | Contact Us'
    },
    component: () => import('@/views/Linkosys/contact.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    meta: {
      title: setTitle('Linkosys | Awesome Workd')
    },
    component: () => import('@/views/Linkosys/projects.vue')
  },
  {
    path: '/commingsoon',
    name: 'commingsoon',
    meta: {
      title: 'Linkosys | Comming Soon'
    },
    component: () => import('@/views/Linkosys/commingsoon.vue')
  }
]

const serviceRoutes = [
  {
    path: '/Services',
    name: 'services',
    meta: {
      title: setTitle()
    },
    component: () => import('@/views/Linkosys/services.vue')
  },
  
  {
    path: '/services/custom-development',
    name: 'services.custom',
    meta: {
      title: setTitle('Custom Software Development Services')
    },
    component: () => import('@/views/Linkosys/servicesCustom.vue')
  },
  {
    path: '/services/web-development',
    name: 'services.webapp',
    meta: {
      title: setTitle('Web Application Development')
    },
    component: () => import('@/views/Linkosys/servicesWeb.vue')
  },
  {
    path: '/services/mobile-development',
    name: 'services.mobile',
    meta: {
      title: setTitle('Mobile Development')
    },
    component: () => import('@/views/Linkosys/servicesMobile.vue')
  },
  {
    path: '/services/ai',
    name: 'services.ai',
    meta: {
      title: setTitle('Artificial Intelligence')
    },
    component: () => import('@/views/Linkosys/servicesAI.vue')
  },
  {
    path: '/services/blockchain',
    name: 'services.blockchain',
    meta: {
      title: setTitle('Blockchain Development')
    },
    component: () => import('@/views/Linkosys/servicesBlockchain.vue')
  },
  {
    path: '/services/data',
    name: 'services.data',
    meta: {
      title: setTitle('Data and Analytics')
    },
    component: () => import('@/views/Linkosys/servicesData.vue')
  }
]


const companyRoutes = [
  {
    path: '/company/team',
    name: 'company.team',
    meta: {
      title: setTitle('Our Team')
    },
    component: () => import('@/views/Linkosys/team.vue')
  },
  {
    path: '/company/aboutus',
    name: 'company.aboutus',
    meta: {
      title: setTitle('About Us')
    },
    component: () => import('@/views/Linkosys/aboutus.vue')
  },
  {
    path: '/company/partners',
    name: 'company.partners',
    meta: {
      title: setTitle('Partners & Main Clients')
    },
    component: () => import('@/views/Linkosys/partners.vue')
  },
  {
    path: '/company/blog',
    name: 'company.blog',
    meta: {
      title: setTitle('Blog')
    },
    component: () => import('@/views/Linkosys/blog.vue')
  }
]

export const linkosysRoutes = [
  ...singleRoutes,
  ...serviceRoutes,
  ...companyRoutes,
  ...authRoutes
]