<template>
  <article class="card card-img-scale border p-2 h-100">
    <div
      v-if="service.image"
      class="card-img-scale-wrapper position-relative rounded overflow-hidden"
    >
      <img
        :src="resolvedImageUrl"
        class="card-img img-scale"
        :alt="service.title"
      />
    </div>
    <b-card-body class="d-flex flex-column px-2">
      <b-card-title tag="h6" class="mb-3">
        {{ service.title }}
      </b-card-title>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <p class="mb-0">{{ service.description }}</p>
        </div>
      </div>
    </b-card-body>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ServiceType } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  service: {
    type: Object as PropType<ServiceType>,
    required: true
  }
})

const getImageUrl = (imageFile: string) => {
  return `/images/services/${imageFile}`
}

const resolvedImageUrl = computed(() => {
  if (props.service?.image) {
    return getImageUrl(props.service.image)
  }
  return '/images/services/fallback.jpg'
})
</script>