<template>
  <DefaultLayout>
    <Hero />
    <Location />
    <ProjectStarter />
    <ContactForm />
  </DefaultLayout>
</template>


<script lang="ts" setup>
import Hero from './components/contact/Hero.vue';
import ContactForm from './components/ContactForm.vue';
import DefaultLayout from '@/layouts/Default.vue'
import Location from './components/contact/Location.vue';
import ProjectStarter from './components/contact/ProjectStarter.vue';

const steps = [
  {
    title: 'Schedule a Consultation Call',
    desc: 'Discuss your needs and goals and help us learn how we can help you realize them.'
  },
  {
    title: 'Explore Solutions and Team Setup',
    desc: 'Examine solutions, clarify requirements, and onboard the ideal team for your needs.'
  },
  {
    title: 'Kick Off and Monitor the Project',
    desc: 'Our team springs into action, keeping you informed and adjusting when necessary.'
  }
]

function openContactForm() {
  // Có thể redirect hoặc mở form liên hệ
  console.log('Schedule Meeting clicked!')
}
</script>
