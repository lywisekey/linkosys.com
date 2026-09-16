<template>
  <DefaultLayout>
    <PageHero
      art="plant"
      eyebrow="Our work"
      title="Selected work"
      lead="Projects delivered by the Linkosys engineering team, grouped by the capability each one demonstrates."
      :crumbs="[{ label: 'Our Work' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'case-studies' }" class="btn btn-primary mb-0">
          Read Case Studies
        </router-link>
        <router-link :to="{ name: 'contact' }" class="btn btn-outline-light mb-0">
          Discuss Your Project
        </router-link>
      </template>
    </PageHero>

    <section v-for="(group, index) in projectGroups" :key="group.key" :class="index ? 'lk-section-tight' : 'lk-section pb-0'">
      <b-container>
        <!-- The group label is the heading; the summary is supporting copy. -->
        <SectionHeader :title="group.label" :lead="group.summary" size="sm" />
        <b-row class="g-4">
          <b-col v-for="project in projectsByGroup(group.key)" :key="project.id" md="6" xl="4">
            <div class="lk-card h-100">
              <h3 class="h6">{{ project.title }}</h3>
              <p class="mb-0">{{ project.description }}</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="lk-section">
      <b-container>
        <div class="lk-card p-4" style="border-left: 3px solid var(--lk-accent)">
          <p class="fw-semibold heading-color mb-2">Reference detail</p>
          <p class="mb-0" style="color: var(--lk-ink-muted)">
            Client names and performance figures are published only where the client has approved
            them. For reference detail on a specific engagement, including past performance
            information for a solicitation, contact us directly.
          </p>
        </div>
      </b-container>
    </section>

    <CtaBand
      title="Discuss your project"
      body="Describe the system and the constraint. We will tell you how we would approach it, and whether we are the right fit."
      action="Discuss Your Project"
    />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import { projectGroups, projectsByGroup } from '@/views/Linkosys/data/projects'
</script>
