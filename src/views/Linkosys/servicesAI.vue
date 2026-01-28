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
    <Services :services="aiServices" />
  </DefaultLayout>
</template>


<script lang="ts" setup>
import Hero from './components/services/Hero.vue';
import DefaultLayout from '@/layouts/Default.vue'
import Services from './components/services/Services.vue';

import { aiServices } from '@/views/Linkosys/data/services-data'

import bgImage from '/images/bg/02.jpg'


</script>
