<template>
  <DefaultLayout>
    <PageHero
      art="secure"
      eyebrow="Government"
      title="Technology Solutions for Government"
      lead="Software engineering, IT consulting, data, cloud, cybersecurity, staffing and technology delivery support for government organizations and government contractors."
      :crumbs="[{ label: 'Government' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Talk to an Expert</router-link>
        <a href="#contract-vehicles" class="btn btn-outline-light mb-0">View Contract Vehicles</a>
      </template>

      <template #aside>
        <div class="lk-hero-panel">
          <p class="lk-eyebrow mb-3">At a glance</p>
          <dl class="mb-0">
            <div v-for="fact in glanceFacts" :key="fact.label" class="lk-fact pt-0">
              <dt>{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </template>
    </PageHero>

    <!-- Capabilities ---------------------------------------------------------->
    <section class="lk-section" id="capabilities">
      <b-container>
        <SectionHeader
          eyebrow="Capabilities"
          title="Government capabilities"
          lead="The disciplines we deliver against, described the way a statement of work describes them."
        />

        <b-row class="g-4">
          <b-col v-for="service in services" :key="service.slug" md="6" xl="4">
            <ServiceCard :service="service" />
          </b-col>
        </b-row>

        <div class="mt-5 pt-2">
          <p class="fw-semibold heading-color mb-3">Additional capability areas</p>
          <b-row class="g-3">
            <b-col v-for="capability in extraCapabilities" :key="capability" sm="6" lg="4">
              <p class="mb-0 d-flex gap-2" style="color: var(--lk-ink-muted)">
                <span aria-hidden="true" style="color: var(--lk-accent)">&#8212;</span>
                {{ capability }}
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <!-- Contract vehicles + identifiers ---------------------------------------->
    <section class="lk-dark lk-section" id="contract-vehicles">
      <b-container>
        <b-row class="g-5">
          <b-col lg="5">
            <p class="lk-eyebrow">Contract vehicles</p>
            <h2 class="lk-display h1 mb-4">How to buy from Linkosys</h2>
            <p class="lk-lead">
              Linkosys holds a federal GSA Multiple Award Schedule and a California Multiple Award
              Schedule. Supporting documents are published on this site.
            </p>
            <p class="small mb-0" style="color: var(--lk-ink-invert-muted)">
              For registration identifiers, labour categories or pricing against either schedule,
              contact us directly and we will respond with the current documentation.
            </p>
          </b-col>

          <b-col lg="6" class="ms-auto">
            <CredentialList :items="credentials" />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Supporting documents ----------------------------------------------------->
    <section class="lk-section" id="documents">
      <b-container>
        <SectionHeader
          eyebrow="Supporting documents"
          title="Registration and contract documents"
          lead="The filings behind the credentials above. Each opens the scanned document."
        />
        <b-row class="g-4">
          <b-col v-for="doc in documents" :key="doc.title" md="4">
            <a
              :href="doc.image"
              target="_blank"
              rel="noopener"
              class="lk-card h-100 text-decoration-none"
            >
              <img
                :src="doc.image"
                :alt="doc.alt"
                loading="lazy"
                decoding="async"
                class="w-100 mb-3"
                style="height: 190px; object-fit: cover; object-position: top; border: 1px solid var(--lk-line)"
              />
              <h3 class="h6 heading-color">{{ doc.title }}</h3>
              <p class="mb-0">{{ doc.description }}</p>
              <span class="fw-semibold small lk-link-accent mt-3">View document &rarr;</span>
            </a>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Past performance -------------------------------------------------------->
    <section class="lk-section" id="past-performance">
      <b-container>
        <SectionHeader
          eyebrow="Past performance"
          title="Past performance"
          lead="Past performance is the first thing a contracting officer looks for and the easiest thing to overstate. These entries are structured and will be published once Linkosys supplies approved detail."
        />
        <b-row class="g-4">
          <b-col v-for="study in caseStudies" :key="study.slug" md="4">
            <CaseStudyCard :study="study" />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Prime partnerships ------------------------------------------------------>
    <section class="lk-section pt-0" id="partnerships">
      <b-container>
        <div class="lk-card p-4 p-lg-5">
          <b-row class="g-4 g-lg-5 align-items-center">
            <b-col lg="6">
              <p class="lk-eyebrow">Prime contractors</p>
              <h2 class="lk-display h2 mb-3">{{ primePartnership.headline }}</h2>
              <p class="mb-4" style="color: var(--lk-ink-muted)">{{ primePartnership.body }}</p>
              <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">
                Partner With Linkosys
              </router-link>
            </b-col>
            <b-col lg="5" class="ms-auto">
              <ul class="list-unstyled mb-0">
                <li
                  v-for="point in primePartnership.points"
                  :key="point"
                  class="py-3 border-top d-flex gap-3"
                >
                  <span aria-hidden="true" style="color: var(--lk-accent)">&#8212;</span>
                  <span class="fw-semibold heading-color">{{ point }}</span>
                </li>
              </ul>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <!-- Capability statement ----------------------------------------------------->
    <section class="lk-darkest lk-section-tight">
      <b-container>
        <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
          <div style="max-width: 46rem">
            <h2 class="lk-display h3 text-white mb-2">Capability statement</h2>
            <p class="mb-0" style="color: var(--lk-ink-invert-muted)">
              Request our capability statement with registration identifiers, NAICS codes, contract
              vehicles and labour categories. Tell us the solicitation or agency and we will send the
              version that matches it.
            </p>
          </div>
          <div class="flex-shrink-0">
            <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">
              Request Capability Statement
            </router-link>
          </div>
        </div>
      </b-container>
    </section>

    <CtaBand
      title="Discuss a requirement"
      body="Send the solicitation, the task order or the teaming requirement. We will tell you directly whether we can support it."
      action="Talk to an Expert"
    />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import ServiceCard from '@/components/linkosys/ServiceCard.vue'
import CredentialList from '@/components/linkosys/CredentialList.vue'
import CaseStudyCard from '@/components/linkosys/CaseStudyCard.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'

import { services } from '@/content/services'
import { caseStudies } from '@/content/solutions'
import { contact, credentials, governmentCapabilities, primePartnership } from '@/content/company'

import gsaPaper from '@/assets/images/awards/gsa-paper.jpg'
import cmasPaper from '@/assets/images/awards/dgs-paper.jpg'
import virginiaPaper from '@/assets/images/awards/commonwealth-paper.jpg'

const documents = [
  {
    title: 'GSA contract summary',
    description: 'Federal Multiple Award Schedule contract summary document for Linkosys.',
    alt: 'Scanned GSA contract summary document listing contract number 47QTCA21D004X',
    image: gsaPaper
  },
  {
    title: 'California CMAS',
    description: 'Ordering instructions, special provisions and CMAS terms and conditions.',
    alt: 'Scanned California Multiple Award Schedule contract document',
    image: cmasPaper
  },
  {
    title: 'Virginia certificate of authority',
    description: 'Certificate authorizing Linkosys Inc. to transact business in Virginia.',
    alt: 'Scanned Commonwealth of Virginia certificate of authority for Linkosys Inc.',
    image: virginiaPaper
  }
]

// Only vehicles and registrations backed by documents published on this site.
const glanceFacts = [
  { label: 'Federal vehicle', value: 'GSA MAS 47QTCA21D004X' },
  { label: 'State vehicle', value: 'California CMAS' },
  { label: 'Entity', value: 'Linkosys Inc., California' },
  { label: 'Contact', value: contact.phone }
]

// The six service cards already cover most of this list; show only the rest.
const covered = ['software', 'data', 'cloud', 'cyber', 'staffing', 'program']
const extraCapabilities = governmentCapabilities.filter(
  (capability) => !covered.some((token) => capability.toLowerCase().includes(token))
)
</script>
