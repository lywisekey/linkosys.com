<template>
  <DefaultLayout>
    <Hero />
    <WhoWeAre />
    <MissionVision :content="missionVisionData" />
    <OurStory />
  </DefaultLayout>
</template>


<script lang="ts" setup>
import Hero from './components/aboutus/AboutHero.vue';
import ContactForm from './components/aboutus/ContactForm.vue';
import MissionVision from './components/aboutus/MissionVision.vue';
import OurStory from './components/aboutus/OurStory.vue';
import DefaultLayout from '@/layouts/Default.vue'
import WhoWeAre from './components/aboutus/WhoWeAre.vue';

import {
  BIconLightbulb,
  BIconTrophy
} from 'bootstrap-icons-vue'

const missionVisionData = {
  headingLabel: 'Our Goal',
  headingTitle: 'Mission &',
  headingSubtitle: 'Vision',
  description1: 'Linkosys is an IT consulting company driven by innovation and a commitment to results.',
  description2: 'We blend technology expertise with a collaborative spirit to deliver solutions that create lasting impact.',
  mission: {
    title: 'Mission',
    icon: BIconTrophy,
    description:
      'To empower businesses through cutting-edge technology and innovative IT solutions. We strive to become a trusted partner by delivering high-impact, scalable software that drives growth, efficiency, and digital transformation.'
  },
  vision: {
    title: 'Vision',
    icon: BIconLightbulb,
    description:
      'To be a leading global software development company recognized for our innovation, integrity, and results-driven approach. We envision a world where every business — regardless of size or industry — can harness the power of technology to thrive and evolve.'
  }
}
</script>
