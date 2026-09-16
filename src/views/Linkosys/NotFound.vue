<template>
  <DefaultLayout>
    <section class="lk-dark lk-grid-bg lk-hero-art pt-8 pb-8" :style="{ backgroundImage: `url(${heroArt.signal})` }">
      <b-container>
        <div style="max-width: 44rem">
          <p class="lk-eyebrow">Error 404</p>
          <h1 class="lk-display display-5 mb-4">We could not find that page</h1>
          <p class="lk-lead">
            The address may have changed, or the link that brought you here may be out of date.
            These are the sections most people are looking for.
          </p>

          <div class="d-flex flex-wrap gap-3 mt-5">
            <router-link :to="{ name: 'homepage' }" class="btn btn-primary mb-0">Go to homepage</router-link>
            <router-link :to="{ name: 'contact' }" class="btn btn-outline-light mb-0">Contact us</router-link>
          </div>
        </div>
      </b-container>
    </section>

    <section class="lk-section">
      <b-container>
        <b-row class="g-4">
          <b-col v-for="link in quickLinks" :key="link.label" md="6" xl="3">
            <router-link :to="link.to" class="lk-card h-100 text-decoration-none">
              <span class="fw-semibold heading-color">{{ link.label }}</span>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import { heroArt } from '@/components/linkosys/heroArt'

const quickLinks = [
  { label: 'Services', to: { name: 'services' } },
  { label: 'Government', to: { name: 'government' } },
  { label: 'Manufacturing', to: { name: 'industry.detail', params: { slug: 'manufacturing' } } },
  { label: 'About Linkosys', to: { name: 'company.aboutus' } }
]
</script>
