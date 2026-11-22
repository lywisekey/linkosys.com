<template>
  <DefaultLayout>
    <PageHero
      art="signal"
      eyebrow="Insights"
      title="Insights"
      lead="Notes from the Linkosys engineering and delivery team on modernization, data, security and getting technology programs delivered."
      :crumbs="[{ label: 'Insights' }]"
    />

    <section class="lk-section">
      <b-container>
        <b-row class="g-4">
          <b-col v-for="insight in insights" :key="insight.slug" md="6">
            <article class="lk-card h-100">
              <p class="small text-body-secondary">By Linkosys · <time :datetime="insight.date">{{ insight.date }}</time></p>
              <h2 class="h4"><router-link :to="`/company/blog/${insight.slug}`">{{ insight.title }}</router-link></h2>
              <p class="mb-0">{{ insight.description }}</p>
            </article>
          </b-col>
        </b-row>

        <div class="mt-5">
          <p class="fw-semibold heading-color mb-3">In the meantime</p>
          <b-row class="g-4">
            <b-col md="4">
              <router-link :to="{ name: 'case-studies' }" class="lk-card h-100 text-decoration-none">
                <h3 class="h6 heading-color">Case studies</h3>
                <p class="mb-0">How engagements are structured, from challenge to result.</p>
              </router-link>
            </b-col>
            <b-col md="4">
              <router-link :to="{ name: 'services' }" class="lk-card h-100 text-decoration-none">
                <h3 class="h6 heading-color">Services</h3>
                <p class="mb-0">Consulting and engineering capabilities and what each one covers.</p>
              </router-link>
            </b-col>
            <b-col md="4">
              <router-link :to="{ name: 'government' }" class="lk-card h-100 text-decoration-none">
                <h3 class="h6 heading-color">Government</h3>
                <p class="mb-0">Capabilities, contract vehicles and how to engage.</p>
              </router-link>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <CtaBand />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { insights } from '@/content/insights'
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
</script>
