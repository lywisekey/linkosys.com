<template>
  <DefaultLayout>
    <template v-if="industry">
      <PageHero
        :art="industry.slug === 'manufacturing' ? 'plant' : 'flow'"
        eyebrow="Industry"
        :title="industry.headline"
        :lead="industry.summary"
        :crumbs="[{ label: 'Industries', to: { name: 'industries' } }, { label: industry.name }]"
      >
        <template #actions>
          <router-link :to="{ name: 'contact', query: isManufacturing ? { service: 'Manufacturing / MES' } : {} }" class="btn btn-primary mb-0">{{ ctaLabel }}</router-link>
        </template>
      </PageHero>

      <!-- What we hear -->
      <section class="lk-section">
        <b-container>
          <b-row class="g-5">
            <b-col lg="5">
              <SectionHeader
                eyebrow="The situation"
                title="What we typically find"
                lead="These are the conditions that usually bring an organization to us."
              />
            </b-col>
            <b-col lg="6" class="ms-auto">
              <ul class="list-unstyled mb-0">
                <li v-for="need in industry.needs" :key="need" class="py-3 border-top d-flex gap-3">
                  <span aria-hidden="true" style="color: var(--lk-accent)">&#8212;</span>
                  <span class="heading-color">{{ need }}</span>
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- Capabilities -->
      <section class="lk-section pt-0">
        <b-container>
          <SectionHeader eyebrow="Capabilities" title="What we deliver" />
          <CapabilityGrid :items="industry.capabilities" />
        </b-container>
      </section>

      <!-- What we build -->
      <section v-if="industry.deliverables?.length" class="lk-section pt-0">
        <b-container>
          <SectionHeader
            eyebrow="What we build"
            title="Systems we deliver in this sector"
            size="sm"
          />
          <b-row class="g-0">
            <b-col v-for="item in industry.deliverables" :key="item" md="6">
              <p class="py-3 mb-0 d-flex gap-3 border-top pe-md-5">
                <span aria-hidden="true" style="color: var(--lk-accent)">&#8212;</span>
                <span class="heading-color">{{ item }}</span>
              </p>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- Sector constraints -->
      <section v-if="industry.considerations?.length" class="lk-section pt-0">
        <b-container>
          <SectionHeader
            eyebrow="Constraints we design around"
            title="What makes this sector different"
            size="sm"
          />
          <b-row class="g-4">
            <b-col v-for="item in industry.considerations" :key="item.title" md="4">
              <div class="lk-card h-100">
                <h3 class="h6">{{ item.title }}</h3>
                <p class="mb-0">{{ item.description }}</p>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- Services that apply -->
      <section class="lk-dark lk-section">
        <b-container>
          <SectionHeader eyebrow="Services" title="Services that apply here" />
          <b-row class="g-4">
            <b-col v-for="service in services.slice(0, 3)" :key="service.slug" md="4">
              <ServiceCard :service="service" />
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- Experience -->
      <section class="lk-section">
        <b-container>
          <SectionHeader eyebrow="Experience" :title="hasSectorStudies ? 'Relevant experience' : 'Selected delivery experience'" />
          <b-row class="g-4">
            <b-col v-for="study in relevantStudies" :key="study.slug" md="4">
              <CaseStudyCard :study="study" />
            </b-col>
          </b-row>
        </b-container>
      </section>

      <AnswerSection v-if="isManufacturing" :items="manufacturingAnswers" title="Manufacturing technology: common questions" />

      <CtaBand :service="isManufacturing ? 'Manufacturing / MES' : undefined" :title="ctaLabel" :body="ctaBody" :action="ctaLabel" />
    </template>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import AnswerSection from '@/components/linkosys/AnswerSection.vue'
import { manufacturingAnswers } from '@/content/faqs'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import CapabilityGrid from '@/components/linkosys/CapabilityGrid.vue'
import ServiceCard from '@/components/linkosys/ServiceCard.vue'
import CaseStudyCard from '@/components/linkosys/CaseStudyCard.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'

import { industryBySlug } from '@/content/industries'
import { services } from '@/content/services'
import { caseStudies } from '@/content/solutions'

const route = useRoute()
const industry = computed(() => industryBySlug(String(route.params.slug)))

const isManufacturing = computed(() => industry.value?.slug === 'manufacturing')

const ctaLabel = computed(() =>
  isManufacturing.value ? 'Discuss Your Manufacturing Challenge' : 'Talk to an Expert'
)
const ctaBody = computed(() =>
  isManufacturing.value
    ? 'Tell us what you cannot see on the floor today, and which systems already hold part of the answer.'
    : 'Describe the problem and the constraint. We will tell you how we would approach it.'
)

const sectorStudies = computed(() => caseStudies.filter(
  (study) => study.sector.toLowerCase() === industry.value?.name.toLowerCase()
))
const hasSectorStudies = computed(() => sectorStudies.value.length > 0)
const relevantStudies = computed(() =>
  hasSectorStudies.value ? sectorStudies.value : caseStudies.slice(0, 3)
)
</script>
