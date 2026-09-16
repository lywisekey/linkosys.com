<template>
  <DefaultLayout>
    <PageHero
      eyebrow="Partners &amp; clients"
      title="Who we work with"
      lead="Linkosys delivers alongside technology partners and for client organizations across government, manufacturing, financial services, media and commercial sectors."
      :crumbs="[{ label: 'Partners & Clients' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Talk to an Expert</router-link>
        <router-link :to="{ name: 'case-studies' }" class="btn btn-outline-light mb-0">
          See Delivered Work
        </router-link>
      </template>
    </PageHero>

    <!-- Logo wall ------------------------------------------------------------->
    <section class="lk-section-tight border-bottom">
      <b-container>
        <p class="lk-eyebrow">Organizations we work with</p>
        <b-row class="g-4 align-items-center mt-1">
          <b-col v-for="partner in partners" :key="partner.title" cols="6" md="4" lg="3">
            <div class="lk-logo-tile" :title="partner.title">
              <img :src="partner.image" :alt="`${partner.title} logo`" loading="lazy" decoding="async" />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- How we partner --------------------------------------------------------->
    <section class="lk-section">
      <b-container>
        <b-row class="g-5">
          <b-col lg="5">
            <SectionHeader
              eyebrow="How we engage"
              title="Four ways we work with partners"
              lead="Most relationships start in one of these shapes and move between them as the work changes."
            />
          </b-col>
          <b-col lg="6" class="ms-auto">
            <ul class="list-unstyled mb-0">
              <li v-for="model in engagementModels" :key="model.title" class="py-4 border-top">
                <p class="fw-semibold heading-color mb-1">{{ model.title }}</p>
                <p class="mb-0" style="color: var(--lk-ink-muted)">{{ model.description }}</p>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Partner detail ---------------------------------------------------------->
    <section class="lk-section pt-0">
      <b-container>
        <SectionHeader eyebrow="Partners" title="Technology partners" />
        <b-row class="g-4">
          <b-col v-for="partner in linkedPartners" :key="partner.title" md="6" xl="4">
            <component
              :is="partner.link && partner.link !== '#' ? 'a' : 'div'"
              :href="partner.link && partner.link !== '#' ? partner.link : undefined"
              :target="partner.link && partner.link !== '#' ? '_blank' : undefined"
              :rel="partner.link && partner.link !== '#' ? 'noopener' : undefined"
              class="lk-card h-100 text-decoration-none"
            >
              <div class="lk-logo-tile lk-logo-tile-sm mb-3">
                <img :src="partner.image" :alt="`${partner.title} logo`" loading="lazy" decoding="async" />
              </div>
              <h3 class="h6 heading-color">{{ partner.title }}</h3>
              <p class="mb-0">{{ partner.description }}</p>
            </component>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <CtaBand
      title="Partner with Linkosys"
      body="If you need engineering capacity, specialized skills or a subcontractor on an active contract, tell us the scope and the timeline."
      action="Talk to an Expert"
      secondary-label="Government Capabilities"
      :secondary-to="{ name: 'government' }"
    />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { partners } from '@/views/Linkosys/data/partner-data'

// Descriptions in the source data are the partner's own marketing copy, written
// in their voice. Only entries with a working link are given a detail card; the
// rest still appear in the logo wall above.
const linkedPartners = computed(() => partners.filter((p) => p.link && p.link !== '#'))

const engagementModels = [
  {
    title: 'Subcontracting and teaming',
    description:
      'Supporting a prime contractor on an awarded contract, including staffing against defined labour categories.'
  },
  {
    title: 'Joint delivery',
    description:
      'Working alongside another firm where each side owns a defined part of the scope and the seams are managed explicitly.'
  },
  {
    title: 'Capacity and specialist skills',
    description:
      'Providing engineers into a partner team when the constraint is bandwidth or a specific discipline rather than direction.'
  },
  {
    title: 'Referral and escalation',
    description:
      'Taking work that falls outside a partner practice area, and passing on work that falls outside ours.'
  }
]
</script>
