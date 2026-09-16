<template>
  <article class="lk-card h-100">
    <p class="lk-eyebrow mb-3">{{ study.sector }}</p>
    <h3 class="h5">{{ study.title }}</h3>

    <!-- Structure ships; content waits for approved client detail. -->
    <template v-if="study.placeholder">
      <p class="mb-3">
        This case study is structured and ready to publish. Linkosys needs to supply the approved
        challenge, approach, technology and results before it goes live.
      </p>
      <VerifyTag label="Case study data required" />
    </template>

    <template v-else>
      <dl class="mb-0 small">
        <dt class="fw-semibold heading-color mt-3">Challenge</dt>
        <dd class="mb-0">{{ study.challenge }}</dd>
        <dt class="fw-semibold heading-color mt-3">Approach</dt>
        <dd class="mb-0">{{ study.approach }}</dd>
        <dt class="fw-semibold heading-color mt-3">Results</dt>
        <dd class="mb-0">{{ study.results }}</dd>
      </dl>
      <ul v-if="study.technology.length" class="list-unstyled d-flex flex-wrap gap-2 mt-3 mb-0">
        <li v-for="tech in study.technology" :key="tech" class="badge bg-light text-dark fw-normal">{{ tech }}</li>
      </ul>
    </template>
  </article>
</template>

<script lang="ts" setup>
import type { CaseStudy } from '@/content/types'
import VerifyTag from './VerifyTag.vue'

defineProps<{ study: CaseStudy }>()
</script>
