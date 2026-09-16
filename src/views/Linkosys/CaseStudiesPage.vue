<template>
  <DefaultLayout>
    <PageHero
      art="signal"
      eyebrow="Case studies"
      title="Case studies"
      lead="Work delivered by the Linkosys engineering team, described by the problem it solved and how it was approached."
      :crumbs="[{ label: 'Case studies' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Discuss Your Project</router-link>
      </template>
    </PageHero>

    <section class="lk-section">
      <b-container>
        <SectionHeader
          eyebrow="Delivered work"
          title="Engagements and what they solved"
          size="sm"
        />

        <b-row class="g-4">
          <b-col v-for="study in caseStudies" :key="study.slug" md="6" xl="4">
            <CaseStudyCard :study="study" detailed />
          </b-col>
        </b-row>

        <div class="lk-card p-4 mt-5" style="border-left: 3px solid var(--lk-accent)">
          <p class="fw-semibold heading-color mb-2">On metrics and client names</p>
          <p class="mb-0" style="color: var(--lk-ink-muted)">
            We publish performance figures and client names only where the client has approved them,
            which is why you will not find percentage improvements or logos attached to the work
            above. For reference detail on a specific engagement, including past performance
            information for a solicitation, contact us directly.
          </p>
        </div>
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
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import CaseStudyCard from '@/components/linkosys/CaseStudyCard.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { caseStudies } from '@/content/solutions'
</script>
