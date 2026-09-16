<template>
  <DefaultLayout>
    <PageHero
      eyebrow="Solutions"
      title="Start from the problem, not the technology"
      lead="Each of these is a business outcome we are regularly brought in to deliver. The engineering follows from the problem."
      :crumbs="[{ label: 'Solutions' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Talk to an Expert</router-link>
      </template>
    </PageHero>

    <section class="lk-section">
      <b-container>
        <div v-for="solution in solutions" :key="solution.slug" class="py-5 border-top">
          <b-row class="g-4 g-lg-5">
            <b-col lg="5">
              <h2 class="lk-display h3 mb-3">{{ solution.title }}</h2>
              <p class="mb-4" style="color: var(--lk-ink-muted)">{{ solution.summary }}</p>
              <div class="d-flex flex-wrap gap-2">
                <router-link
                  v-for="slug in solution.relatedServices"
                  :key="slug"
                  :to="{ name: 'services.detail', params: { slug } }"
                  class="badge fw-normal text-decoration-none"
                  style="background: #f1f4f8; color: var(--lk-ink)"
                >
                  {{ serviceBySlug(slug)?.name }}
                </router-link>
              </div>
            </b-col>
            <b-col lg="6" class="ms-auto">
              <p class="fw-semibold heading-color mb-3">What changes</p>
              <ul class="list-unstyled mb-0">
                <li v-for="outcome in solution.outcomes" :key="outcome" class="d-flex gap-3 py-2">
                  <span aria-hidden="true" style="color: var(--lk-accent)">&#8212;</span>
                  <span style="color: var(--lk-ink-muted)">{{ outcome }}</span>
                </li>
              </ul>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <CtaBand />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { solutions } from '@/content/solutions'
import { serviceBySlug } from '@/content/services'
</script>
