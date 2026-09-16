<template>
  <router-link :to="{ name: 'services.detail', params: { slug: service.slug } }" class="lk-card h-100 text-decoration-none">
    <h3 class="h5 heading-color">{{ service.name }}</h3>
    <p class="flex-grow-1">{{ service.summary }}</p>
    <span class="fw-semibold small lk-link-accent d-inline-flex align-items-center gap-2 mt-2">
      {{ linkLabel }}
      <span aria-hidden="true">&rarr;</span>
    </span>
  </router-link>
</template>

<script lang="ts" setup>
import type { ServicePage } from '@/content/types'

withDefaults(defineProps<{ service: ServicePage; linkLabel?: string }>(), {
  linkLabel: 'View capabilities'
})
</script>
