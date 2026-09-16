<template>
  <DefaultLayout>
    <template v-if="service">
      <PageHero
      art="arch"
        eyebrow="Service"
        :title="service.headline"
        :lead="service.intro"
        :crumbs="[{ label: 'Services', to: { name: 'services' } }, { label: service.name }]"
      >
        <template #actions>
          <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">
            {{ service.cta.label }}
          </router-link>
        </template>
      </PageHero>

      <!-- Business problems -->
      <section class="lk-section">
        <b-container>
          <SectionHeader
            eyebrow="Business problems"
            title="What clients come to us with"
            lead="If one of these matches your situation, we have a starting point."
          />
          <ProblemList :items="service.problems" />
        </b-container>
      </section>

      <!-- Capabilities -->
      <section class="lk-section pt-0">
        <b-container>
          <SectionHeader eyebrow="Capabilities" :title="`${service.name} capabilities`" />
          <CapabilityGrid :items="service.capabilities" />
        </b-container>
      </section>

      <!-- How we work -->
      <section class="lk-dark lk-section">
        <b-container>
          <SectionHeader eyebrow="How we work" title="Our delivery approach" />
          <b-row class="g-4">
            <b-col v-for="(step, index) in service.approach" :key="step.title" md="6" xl="3">
              <div class="lk-card h-100">
                <p class="h5 mb-3" style="color: var(--lk-accent); font-variant-numeric: tabular-nums">
                  {{ String(index + 1).padStart(2, '0') }}
                </p>
                <h3 class="h6">{{ step.title }}</h3>
                <p class="mb-0">{{ step.description }}</p>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- Technology -->
      <section class="lk-section">
        <b-container>
          <SectionHeader
            eyebrow="Technology"
            title="Technologies we work with"
            lead="Technology is chosen to fit the client environment and the people who will maintain it, not the other way round."
          />
          <b-row class="g-4">
            <b-col v-for="group in service.technology" :key="group.group" md="6" xl="3">
              <p class="fw-semibold heading-color mb-3">{{ group.group }}</p>
              <ul class="list-unstyled d-flex flex-wrap gap-2 mb-0">
                <li
                  v-for="item in group.items"
                  :key="item"
                  class="badge fw-normal"
                  style="background: #f1f4f8; color: var(--lk-ink)"
                >
                  {{ item }}
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- Related case study -->
      <section class="lk-section pt-0">
        <b-container>
          <SectionHeader eyebrow="Experience" title="Relevant experience" />
          <b-row class="g-4">
            <b-col v-for="study in caseStudies.slice(0, 3)" :key="study.slug" md="4">
              <CaseStudyCard :study="study" />
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- Other services -->
      <section class="lk-section pt-0">
        <b-container>
          <SectionHeader eyebrow="Services" title="Other capabilities" />
          <b-row class="g-4">
            <b-col v-for="other in otherServices" :key="other.slug" md="6" xl="4">
              <ServiceCard :service="other" />
            </b-col>
          </b-row>
        </b-container>
      </section>

      <CtaBand :title="service.cta.label" :body="service.cta.sub" :action="service.cta.label" />
    </template>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import ProblemList from '@/components/linkosys/ProblemList.vue'
import CapabilityGrid from '@/components/linkosys/CapabilityGrid.vue'
import CaseStudyCard from '@/components/linkosys/CaseStudyCard.vue'
import ServiceCard from '@/components/linkosys/ServiceCard.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'

import { serviceBySlug, services } from '@/content/services'
import { caseStudies } from '@/content/solutions'

const route = useRoute()

const service = computed(() => serviceBySlug(String(route.params.slug)))
const otherServices = computed(() =>
  services.filter((entry) => entry.slug !== service.value?.slug).slice(0, 3)
)
</script>
