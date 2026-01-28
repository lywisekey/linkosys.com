<template>
  <DefaultLayout>
    <Hero
      :breadcrumbs="[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Web Development' }
      ]"
      title="Web Development"
      subtitle="Constantly seeking optimal solutions to enhance product quality, reduce costs, and streamline production for clients."
      :background="bgImage"
    />
    <Services />
    <Commitment />
    <div class="mt-8">
      <Step />
    </div>
    
  </DefaultLayout>
</template>


<script lang="ts" setup>
import Hero from './components/services/Hero.vue';
import DefaultLayout from '@/layouts/Default.vue'
import Step from './components/homepage/Steps.vue';
import Services from './components/homepage/Services.vue';
import Commitment from './components/services/Commitment.vue';
import bgImage from '@/assets/images/linkosys/bg/01.jpg'

</script>
