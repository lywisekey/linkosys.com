<template>
  <router-link
    :to="{ name: 'services.detail', params: { slug: service.slug } }"
    class="lk-service-card text-decoration-none"
  >
    <div v-if="illustration" class="lk-service-card-art">
      <img :src="illustration" alt="" aria-hidden="true" loading="lazy" decoding="async" />
    </div>

    <div class="lk-service-card-body">
      <h3 class="h5">{{ service.name }}</h3>
      <p class="flex-grow-1">{{ service.summary }}</p>
      <span class="fw-semibold small lk-link-accent d-inline-flex align-items-center gap-2 mt-2">
        {{ linkLabel }}
        <span class="lk-service-card-arrow" aria-hidden="true">&rarr;</span>
      </span>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ServicePage } from '@/content/types'
import { serviceIllustrations } from './serviceIllustrations'

const props = withDefaults(
  defineProps<{ service: ServicePage; linkLabel?: string; art?: boolean }>(),
  { linkLabel: 'View capabilities', art: true }
)

const illustration = computed(() =>
  props.art ? serviceIllustrations[props.service.slug] : undefined
)
</script>
