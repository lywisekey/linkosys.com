<template>
  <div class="d-grid gap-0">
    <div v-for="item in items" :key="item.problem" class="py-4 border-top">
      <b-row class="g-3 g-md-4">
        <b-col md="5">
          <p class="fw-semibold heading-color mb-0">{{ item.problem }}</p>
        </b-col>
        <b-col md="7">
          <p class="mb-0" style="color: var(--lk-ink-muted)">{{ item.response }}</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BusinessProblem } from '@/content/types'

defineProps<{ items: BusinessProblem[] }>()
</script>
