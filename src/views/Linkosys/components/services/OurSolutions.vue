<template>
  <OurSolutionsContent
    :title="title"
    :description="description"
    :items="solutions"
  />
</template>

<script setup lang="ts">
import OurSolutionsContent from './OurSolutionsContent.vue'

defineProps<{
  title: string
  description: string
  solutions: {
    icon: any
    title: string
    description: string
  }[]
}>()
</script>