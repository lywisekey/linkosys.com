<template>
  <b-row class="g-4">
    <b-col v-for="item in items" :key="item.title" md="6" xl="4">
      <div class="lk-card h-100">
        <h3 class="h5">{{ item.title }}</h3>
        <p class="mb-0">{{ item.description }}</p>
      </div>
    </b-col>
  </b-row>
</template>

<script lang="ts" setup>
import type { Capability } from '@/content/types'

defineProps<{ items: Capability[] }>()
</script>
