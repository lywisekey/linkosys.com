<template>
  <DefaultLayout>
    <Hero
      :breadcrumbs="[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Data and Analytics' }
      ]"
      title="Data and Analytics Services"
      subtitle="We assist organizations in developing and implementing robust enterprise data management strategies and data warehouse architectures that ensure data security, accuracy, and reliability. "
      :background="bgImage"
    />
    <Services />
  </DefaultLayout>
</template>


<script lang="ts" setup>
import Hero from './components/services/Hero.vue';
import DefaultLayout from '@/layouts/Default.vue'

import bgImage from '/images/bg/14.jpg'
import Services from './components/services/data/Services.vue';


</script>
