<template>
  <DefaultLayout>
    <!-- Hero ---------------------------------------------------------------->
    <section class="lk-dark lk-grid-bg lk-hero-art pt-8 pb-7" :style="{ backgroundImage: `url(${heroArt.arch})` }">
      <b-container>
        <div style="max-width: 56rem">
          <p class="lk-eyebrow">Technology consulting &amp; engineering</p>
          <h1 class="lk-display display-4 mb-4">Enterprise IT consulting and software engineering.</h1>
          <p class="lk-lead mb-0" style="font-size: 1.25rem; max-width: 52rem">
            Based in Irvine, California, Linkosys helps mid-sized businesses, enterprises and manufacturers
            modernize software, apply AI, connect systems and strengthen cloud and security operations.
            We serve organizations across the United States, including government agencies.
          </p>

          <div class="d-flex flex-wrap gap-3 mt-5">
            <router-link :to="{ name: 'contact' }" class="btn btn-primary btn-lg mb-0">
              Talk to an Expert
            </router-link>
            <router-link :to="{ name: 'services' }" class="btn btn-outline-light btn-lg mb-0">
              Explore Our Services
            </router-link>
          </div>
        </div>
      </b-container>
    </section>

    <!-- Trust strip: only credentials backed by documents on file ------------->
    <section class="lk-darkest py-4 border-top" style="border-color: var(--lk-line-dark) !important">
      <b-container>
        <b-row class="g-4 align-items-center">
          <b-col md="3" v-for="fact in trustFacts" :key="fact.label">
            <p class="small mb-1" style="color: var(--lk-ink-invert-muted)">{{ fact.label }}</p>
            <p class="fw-semibold text-white mb-0">{{ fact.value }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Services -------------------------------------------------------------->
    <section class="lk-section" id="services">
      <b-container>
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="What we do"
            lead="Consulting and engineering that cover the work end to end — from the engineering itself to the people and management structure that deliver it."
          />
        </Reveal>

        <b-row class="g-4">
          <b-col v-for="service in services" :key="service.slug" md="6" xl="4">
            <Reveal>
              <ServiceCard :service="service" />
            </Reveal>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Solutions ------------------------------------------------------------->
    <section class="lk-section pt-0">
      <b-container>
        <Reveal>
          <SectionHeader
            eyebrow="Solutions"
            title="Problems we are brought in to solve"
            lead="Most engagements start with one of these."
          />
        </Reveal>

        <b-row class="g-4">
          <b-col v-for="solution in solutions.slice(0, 6)" :key="solution.slug" md="6" lg="4">
            <Reveal>
              <router-link
                :to="{ name: 'solutions', hash: `#${solution.slug}` }"
                class="lk-card h-100 text-decoration-none"
              >
                <h3 class="h5 heading-color">{{ solution.title }}</h3>
                <p class="mb-0">{{ solution.summary }}</p>
              </router-link>
            </Reveal>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="lk-section pt-0">
      <b-container>
        <SectionHeader eyebrow="California enterprise consulting" title="Where should your technology investment start?"
          lead="Start with the business process that is constrained, the systems it depends on and the risk of changing it. An assessment should produce priorities, a delivery sequence and acceptance criteria your team can review." />
        <div class="d-flex flex-wrap gap-3">
          <router-link to="/services/it-consulting" class="btn btn-primary mb-0">Explore Enterprise IT Consulting</router-link>
          <router-link to="/contact" class="btn btn-outline-primary mb-0">Request a Consultation</router-link>
        </div>
      </b-container>
    </section>

    <!-- Government ------------------------------------------------------------>
    <section class="lk-dark lk-grid-bg lk-hero-art lk-section" :style="{ backgroundImage: `url(${heroArt.secure})` }">
      <b-container>
        <b-row class="g-5 align-items-center">
          <b-col lg="6">
            <p class="lk-eyebrow">Government</p>
            <h2 class="lk-display h1 mb-4">Technology solutions for government</h2>
            <p class="lk-lead">
              Linkosys provides technology services supporting government organizations and
              government contractors across software engineering, IT staffing, AI and data, cloud,
              cybersecurity and project management.
            </p>
            <div class="d-flex flex-wrap gap-3 mt-4">
              <router-link
                :to="{ name: 'government' }"
                class="btn btn-primary mb-0"
              >
                Explore Government Capabilities
              </router-link>
              <router-link
                :to="{ name: 'government', hash: '#partnerships' }"
                class="btn btn-outline-light mb-0"
              >
                Partner With Linkosys
              </router-link>
            </div>
          </b-col>

          <b-col lg="5" class="ms-auto">
            <dl class="mb-0">
              <div
                v-for="credential in verifiedCredentials"
                :key="credential.label"
                class="lk-fact"
              >
                <dt>{{ credential.label }}</dt>
                <dd>{{ credential.value }}</dd>
              </div>
            </dl>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Manufacturing --------------------------------------------------------->
    <section class="lk-section">
      <b-container>
        <b-row class="g-5">
          <b-col lg="5">
            <p class="lk-eyebrow">Manufacturing</p>
            <h2 class="lk-display h1 mb-4">Your factory. Connected.</h2>
            <p class="lk-lead">
              We help manufacturers connect production systems, machines, people, processes and data
              — so what happens on the floor is visible everywhere it needs to be.
            </p>
            <router-link :to="{ name: 'industry.detail', params: { slug: 'manufacturing' } }" class="btn btn-primary mt-3 mb-0">
              Explore Manufacturing Solutions
            </router-link>
          </b-col>

          <b-col lg="7">
            <b-row class="g-4">
              <b-col v-for="capability in manufacturingCapabilities" :key="capability.title" sm="6">
                <Reveal>
                  <div class="lk-card h-100">
                    <h3 class="h6">{{ capability.title }}</h3>
                    <p class="mb-0">{{ capability.description }}</p>
                  </div>
                </Reveal>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Approach -------------------------------------------------------------->
    <section class="lk-section pt-0">
      <b-container>
        <Reveal>
          <SectionHeader eyebrow="How we work" title="Our approach" />
        </Reveal>
        <b-row class="g-4">
          <b-col v-for="(item, index) in approach" :key="item.title" md="6" xl="3">
            <Reveal>
              <div class="h-100">
                <p class="h4 mb-3" style="color: var(--lk-accent); font-variant-numeric: tabular-nums">
                  {{ String(index + 1).padStart(2, '0') }}
                </p>
                <h3 class="h6 mb-2">{{ item.title }}</h3>
                <p class="mb-0" style="color: var(--lk-ink-muted); font-size: 0.9375rem">
                  {{ item.description }}
                </p>
              </div>
            </Reveal>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Industries ------------------------------------------------------------>
    <section class="lk-section pt-0">
      <b-container>
        <Reveal>
          <SectionHeader eyebrow="Industries" title="Where we work" />
        </Reveal>
        <b-row class="g-3">
          <b-col v-for="industry in industries" :key="industry.slug" sm="6" lg="4">
            <router-link
              :to="
                industry.slug === 'government'
                  ? { name: 'government' }
                  : { name: 'industry.detail', params: { slug: industry.slug } }
              "
              class="lk-card text-decoration-none py-3"
            >
              <span class="fw-semibold heading-color">{{ industry.name }}</span>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <CtaBand
      title="Talk to an expert"
      body="Tell us the problem and the constraint. We will tell you how we would approach it — and whether we are the right fit."
      action="Talk to an Expert"
      secondary-label="View Government Capabilities"
      :secondary-to="{ name: 'government' }"
    />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import ServiceCard from '@/components/linkosys/ServiceCard.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import Reveal from '@/components/linkosys/Reveal.vue'

import { services } from '@/content/services'
import { solutions } from '@/content/solutions'
import { industries, industryBySlug } from '@/content/industries'
import { approach, verifiedCredentials } from '@/content/company'
import { heroArt } from '@/components/linkosys/heroArt'

// Only the four credentials with supporting documents already on this site.
const trustFacts = [
  { label: 'Federal contract vehicle', value: 'GSA MAS 47QTCA21D004X' },
  { label: 'State contract vehicle', value: 'California CMAS' },
  { label: 'Incorporated', value: 'Linkosys Inc., California' },
  { label: 'BBB rating', value: 'A+ accredited' }
]

const manufacturingCapabilities = industryBySlug('manufacturing')!.capabilities.slice(0, 4)
</script>
