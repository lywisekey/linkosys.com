<template>
  <DefaultLayout>
    <PageHero
      art="signal"
      eyebrow="Insights"
      title="Insights"
      lead="Notes from the Linkosys engineering and delivery team on modernization, data, security and getting technology programs delivered."
      :crumbs="[{ label: 'Insights' }]"
    />

    <section class="lk-section">
      <b-container>
        <div class="lk-card p-4 p-lg-5" style="border-left: 3px solid var(--lk-accent)">
          <h2 class="h4 mb-3">No articles published yet</h2>
          <p class="mb-4" style="color: var(--lk-ink-muted); max-width: 60ch">
            This page previously displayed technology news pulled from an external publisher's feed
            under a heading that presented it as Linkosys content. That has been removed: republishing
            another outlet's consumer technology coverage does not demonstrate engineering capability,
            and it sent every click away from this site.
          </p>
          <p class="mb-4" style="color: var(--lk-ink-muted); max-width: 60ch">
            Insights will publish here once Linkosys supplies its own material. The strongest
            starting points are the topics buyers already search for: application modernization,
            IT/OT convergence on the plant floor, and preparing for a security assessment.
          </p>
          <VerifyTag label="Article content required" />
        </div>

        <div class="mt-5">
          <p class="fw-semibold heading-color mb-3">In the meantime</p>
          <b-row class="g-4">
            <b-col md="4">
              <router-link :to="{ name: 'case-studies' }" class="lk-card h-100 text-decoration-none">
                <h3 class="h6 heading-color">Case studies</h3>
                <p class="mb-0">How engagements are structured, from challenge to result.</p>
              </router-link>
            </b-col>
            <b-col md="4">
              <router-link :to="{ name: 'services' }" class="lk-card h-100 text-decoration-none">
                <h3 class="h6 heading-color">Services</h3>
                <p class="mb-0">The six practices and what each one actually covers.</p>
              </router-link>
            </b-col>
            <b-col md="4">
              <router-link :to="{ name: 'government' }" class="lk-card h-100 text-decoration-none">
                <h3 class="h6 heading-color">Government</h3>
                <p class="mb-0">Capabilities, contract vehicles and how to engage.</p>
              </router-link>
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
import VerifyTag from '@/components/linkosys/VerifyTag.vue'
</script>
