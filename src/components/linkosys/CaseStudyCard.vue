<template>
  <article class="lk-card h-100">
    <p class="lk-eyebrow mb-3">{{ study.sector }}</p>
    <h3 class="h5">{{ study.title }}</h3>

    <dl class="mb-0 small flex-grow-1">
      <template v-if="study.challenge">
        <dt class="fw-semibold heading-color mt-3">Challenge</dt>
        <dd class="mb-0">{{ study.challenge }}</dd>
      </template>
      <template v-if="study.approach">
        <dt class="fw-semibold heading-color mt-3">Approach</dt>
        <dd class="mb-0">{{ study.approach }}</dd>
      </template>
      <template v-if="detailed && study.solution">
        <dt class="fw-semibold heading-color mt-3">Solution</dt>
        <dd class="mb-0">{{ study.solution }}</dd>
      </template>
      <!-- Results render only when Linkosys has supplied client-approved figures. -->
      <template v-if="study.results">
        <dt class="fw-semibold heading-color mt-3">Results</dt>
        <dd class="mb-0">{{ study.results }}</dd>
      </template>
    </dl>

    <ul v-if="study.technology.length" class="list-unstyled d-flex flex-wrap gap-2 mt-4 mb-0">
      <li
        v-for="tech in study.technology"
        :key="tech"
        class="badge fw-normal"
        style="background: #f1f4f8; color: var(--lk-ink)"
      >
        {{ tech }}
      </li>
    </ul>
  </article>
</template>

<script lang="ts" setup>
import type { CaseStudy } from '@/content/types'

withDefaults(defineProps<{ study: CaseStudy; detailed?: boolean }>(), { detailed: false })
</script>
