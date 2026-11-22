<template>
  <DefaultLayout>
    <template v-if="insight">
      <PageHero
        art="signal"
        eyebrow="Insights"
        :title="insight.title"
        :lead="insight.description"
        :crumbs="[{ label: 'Insights', to: { name: 'company.blog' } }, { label: insight.title }]"
      />
      <article class="lk-section">
        <b-container>
          <div class="mx-auto" style="max-width: 75ch">
            <p class="text-body-secondary">
              By Linkosys · <time :datetime="insight.date">{{ displayDate(insight.date) }}</time>
            </p>
            <nav aria-label="Article contents" class="lk-card mb-5">
              <p class="fw-semibold">In this guide</p>
              <ul class="mb-0">
                <li v-for="(section, index) in insight.sections" :key="section.heading">
                  <a :href="`#section-${index + 1}`">{{ section.heading }}</a>
                </li>
              </ul>
            </nav>
            <section
              v-for="(section, index) in insight.sections"
              :key="section.heading"
              class="mb-5"
              :id="`section-${index + 1}`"
            >
              <h2 class="h3 mb-3">{{ section.heading }}</h2>
              <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
              <ol v-if="section.steps" class="ps-4">
                <li v-for="step in section.steps" :key="step" class="mb-2">{{ step }}</li>
              </ol>
            </section>
            <aside class="lk-card" aria-label="Related capabilities">
              <h2 class="h4">Explore related services</h2>
              <ul class="mb-0">
                <li v-for="link in insight.related" :key="link.path">
                  <router-link :to="link.path">{{ link.label }}</router-link>
                </li>
              </ul>
            </aside>
          </div>
        </b-container>
      </article>
      <CtaBand title="Discuss your technology decision" action="Request a Consultation" />
    </template>
  </DefaultLayout>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { insightBySlug } from '@/content/insights'
const route = useRoute()
const insight = computed(() => insightBySlug(String(route.params.slug)))
const displayDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`))
</script>
