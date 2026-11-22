<template>
  <section class="lk-darkest lk-section-tight">
    <b-container>
      <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
        <div style="max-width: 40rem">
          <h2 class="lk-display h2 text-white mb-2">{{ title }}</h2>
          <p class="mb-0" style="color: var(--lk-ink-invert-muted)">{{ body }}</p>
        </div>
        <div class="d-flex flex-wrap gap-3 flex-shrink-0">
          <router-link :to="{ name: 'contact', query: service ? { service } : {} }" class="btn btn-primary mb-0">{{ action }}</router-link>
          <router-link v-if="secondaryTo" :to="secondaryTo" class="btn btn-outline-light mb-0">
            {{ secondaryLabel }}
          </router-link>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    title?: string
    body?: string
    action?: string
    service?: string
    secondaryLabel?: string
    secondaryTo?: RouteLocationRaw
  }>(),
  {
    title: 'Talk to an expert',
    body: 'Describe the problem and the constraint. We will tell you how we would approach it, and whether we are the right fit.',
    action: 'Talk to an Expert'
  }
)
</script>
