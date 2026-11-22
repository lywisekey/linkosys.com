<template>
  <DefaultLayout>
    <PageHero art="signal" eyebrow="Coming soon" title="This page is being prepared"
      lead="Explore our current services or talk with the Linkosys team about your requirements."
      :crumbs="[{ label: 'Coming soon' }]">
      <template #actions>
        <router-link to="/services" class="btn btn-primary mb-0">Explore Services</router-link>
        <router-link to="/contact" class="btn btn-outline-light mb-0">Contact Linkosys</router-link>
      </template>
    </PageHero>
  </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
</script>
