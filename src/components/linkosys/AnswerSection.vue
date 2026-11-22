<template>
  <section v-if="items.length" class="lk-section pt-0">
    <b-container>
      <p class="lk-eyebrow">Questions and answers</p>
      <h2 class="lk-display h2 mb-4">{{ title }}</h2>
      <div v-for="item in items" :key="item.question" class="border-top py-4" style="max-width: 75ch">
        <h3 class="h5 mb-3">{{ item.question }}</h3>
        <p class="mb-0">{{ item.answer }}</p>
      </div>
    </b-container>
  </section>
</template>
<script lang="ts" setup>
import type { Answer } from '@/content/faqs'
defineProps<{ items: Answer[]; title: string }>()
</script>
