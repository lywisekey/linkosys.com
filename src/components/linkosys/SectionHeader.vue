<template>
  <div class="mb-5" :class="center ? 'text-center mx-auto' : ''" :style="center ? 'max-width: 46rem' : ''">
    <p v-if="eyebrow" class="lk-eyebrow">{{ eyebrow }}</p>
    <h2 class="lk-display h1 mb-3">{{ title }}</h2>
    <p v-if="lead" class="lk-lead mb-0" :class="center ? 'mx-auto' : ''">{{ lead }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  eyebrow?: string
  title: string
  lead?: string
  center?: boolean
}>()
</script>
