<template>
  <DefaultLayout>
    <PageHero
      art="flow"
      eyebrow="Industries"
      title="Industries we work in"
      lead="The engineering is consistent; the constraints are not. These are the environments we know well enough to be useful in quickly."
      :crumbs="[{ label: 'Industries' }]"
    />

    <section class="lk-section">
      <b-container>
        <b-row class="g-4">
          <b-col v-for="industry in industries" :key="industry.slug" md="6" xl="4">
            <router-link
              :to="industry.slug === 'government' ? { name: 'government' } : { name: 'industry.detail', params: { slug: industry.slug } }"
              class="lk-card h-100 text-decoration-none"
            >
              <h2 class="h5 heading-color">{{ industry.name }}</h2>
              <p class="mb-0">{{ industry.summary }}</p>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <CtaBand />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { industries } from '@/content/industries'
</script>
