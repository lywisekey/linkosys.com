<template>
  <DefaultLayout>
    <Hero
      :breadcrumbs="[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Blockchain Development' }
      ]"
      title="Blockchain Development"
      subtitle="We drive innovation across technologies, meeting industry demands to deliver a comprehensive service spectrum. Employing diverse tools and frameworks in web app development, we consistently offer optimal solutions to our clients."
      :background="bgImage"
    />
    <Services />
  </DefaultLayout>
</template>


<script lang="ts" setup>
import Hero from './components/services/Hero.vue';
import DefaultLayout from '@/layouts/Default.vue'
import Services from './components/services/blockchain/Services.vue';
import bgImage from '/images/bg/01.jpg'


</script>
