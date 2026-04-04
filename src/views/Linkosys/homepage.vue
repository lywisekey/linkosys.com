<template>
  <DefaultLayout>
    <Hero />
    <About />
    <Services />
    <DigitalJourney />
    <Steps />
    <Testimonials />
    <Award />
    <Blogs />
    <Partners />
    
  </DefaultLayout>
</template>

<script lang="ts" setup>
import CTA from '@/views/Linkosys/components/homepage/CTA.vue'
import Blogs from '@/views/Linkosys/components/homepage/Blogs.vue'
import Testimonials from '@/views/Linkosys/components/homepage/Testimonials.vue'
import Award from '@/views/Linkosys/components/homepage/Award.vue'
import About from '@/views/Linkosys/components/homepage/About.vue'
import Services from '@/views/Linkosys/components/homepage/Services.vue'
import DigitalJourney from '@/views/Linkosys/components/homepage/DigitalJourney.vue'
import Steps from '@/views/Linkosys/components/homepage/Steps.vue'
import Partners from './components/homepage/Partners.vue'
import DefaultLayout from '@/layouts/Default.vue'
import Hero from './components/homepage/Hero.vue'

</script>
