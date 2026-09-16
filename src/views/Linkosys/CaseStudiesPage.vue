<template>
  <DefaultLayout>
    <PageHero
      eyebrow="Case studies"
      title="Case studies"
      lead="Structured accounts of work delivered: the problem, the approach, the technology and what changed."
      :crumbs="[{ label: 'Case studies' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Discuss Your Project</router-link>
      </template>
    </PageHero>

    <section class="lk-section">
      <b-container>
        <div class="lk-card p-4 mb-5" style="border-left: 3px solid var(--lk-accent)">
          <p class="fw-semibold heading-color mb-2">Why these are empty</p>
          <p class="mb-0" style="color: var(--lk-ink-muted)">
            Client names, contract values and performance metrics are the most damaging things a
            technology company can invent, and the easiest for a buyer to check. The case study
            format is built and ready; each entry publishes as soon as Linkosys supplies approved,
            client-cleared detail.
          </p>
        </div>

        <b-row class="g-4">
          <b-col v-for="study in caseStudies" :key="study.slug" md="6" xl="4">
            <CaseStudyCard :study="study" />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <CtaBand
      title="Discuss your project"
      body="If you want to understand how we would approach a specific problem, the fastest route is a direct conversation."
      action="Discuss Your Project"
    />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import CaseStudyCard from '@/components/linkosys/CaseStudyCard.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { caseStudies } from '@/content/solutions'
</script>
