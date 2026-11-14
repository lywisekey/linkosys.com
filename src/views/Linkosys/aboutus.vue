<template>
  <DefaultLayout>
    <PageHero
      art="arch"
      eyebrow="About"
      title="A U.S. technology firm built around delivery"
      lead="Linkosys Inc. is a California-incorporated technology consulting and engineering company. We build and modernize software, connect data, secure systems and provide the engineers and management structure that get technology programs finished."
      :crumbs="[{ label: 'About' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Talk to an Expert</router-link>
        <router-link :to="{ name: 'government' }" class="btn btn-outline-light mb-0">
          Government Capabilities
        </router-link>
      </template>
    </PageHero>

    <!-- What we do ------------------------------------------------------------>
    <section class="lk-section">
      <b-container>
        <b-row class="g-5">
          <b-col lg="5">
            <SectionHeader eyebrow="What we do" title="Engineering, and the people who deliver it" />
          </b-col>
          <b-col lg="6" class="ms-auto">
            <p class="lk-lead">
              We work in two directions at once. We deliver projects as a team — taking
              responsibility for an outcome, from definition through release and support. And we
              place engineers directly into client teams when the constraint is capacity or a
              specific skill rather than ownership.
            </p>
            <p style="color: var(--lk-ink-muted)">
              Both routes draw on the same six practices: software development, AI and data, cloud
              and infrastructure, cybersecurity, IT staffing, and project and program management.
              Clients include government organizations, prime contractors, manufacturers and
              established commercial companies.
            </p>
            <router-link :to="{ name: 'services' }" class="lk-link-accent text-decoration-none">
              View our services &rarr;
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Approach -------------------------------------------------------------->
    <section class="lk-dark lk-section" id="approach">
      <b-container>
        <SectionHeader
          eyebrow="Our approach"
          title="How we work"
          lead="Four commitments that shape every engagement. They are deliberately unglamorous — they are the things that decide whether a project lands."
        />
        <b-row class="g-4">
          <b-col v-for="(item, index) in approach" :key="item.title" md="6">
            <div class="lk-card h-100">
              <p class="h5 mb-3" style="color: var(--lk-accent); font-variant-numeric: tabular-nums">
                {{ String(index + 1).padStart(2, '0') }}
              </p>
              <h3 class="h6">{{ item.title }}</h3>
              <p class="mb-0">{{ item.description }}</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Company facts ---------------------------------------------------------->
    <section class="lk-section">
      <b-container>
        <b-row class="g-5">
          <b-col lg="5">
            <SectionHeader
              eyebrow="Company"
              title="Corporate facts"
              lead="Registration and contract information, as published in our own filings."
            />
            <p class="small" style="color: var(--lk-ink-muted)">
              For current registration identifiers, contract terms and procurement documentation,
              contact our team directly.
            </p>
          </b-col>
          <b-col lg="6" class="ms-auto">
            <CredentialList :items="credentials" />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Industries ------------------------------------------------------------->
    <section class="lk-section pt-0">
      <b-container>
        <SectionHeader eyebrow="Industries" title="Where we work" />
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

    <CtaBand />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import CredentialList from '@/components/linkosys/CredentialList.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'

import { approach, credentials } from '@/content/company'
import { industries } from '@/content/industries'
</script>
