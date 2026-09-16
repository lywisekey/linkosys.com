<template>
  <DefaultLayout>
    <PageHero
      eyebrow="Services"
      title="Technology services built around delivery"
      lead="Six practices covering engineering, data, infrastructure, security, people and the management structure that holds a program together."
      :crumbs="[{ label: 'Services' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Talk to an Expert</router-link>
      </template>
    </PageHero>

    <section class="lk-section">
      <b-container>
        <b-row class="g-4">
          <b-col v-for="service in services" :key="service.slug" md="6" xl="4">
            <ServiceCard :service="service" />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="lk-section pt-0">
      <b-container>
        <SectionHeader eyebrow="Solutions" title="Or start from the problem" />
        <b-row class="g-4">
          <b-col v-for="solution in solutions" :key="solution.slug" md="6" lg="4">
            <router-link :to="{ name: 'solutions' }" class="lk-card h-100 text-decoration-none">
              <h3 class="h6 heading-color">{{ solution.title }}</h3>
              <p class="mb-0">{{ solution.summary }}</p>
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
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import ServiceCard from '@/components/linkosys/ServiceCard.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { services } from '@/content/services'
import { solutions } from '@/content/solutions'
</script>
