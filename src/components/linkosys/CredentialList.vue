<template>
  <dl class="mb-0">
    <div v-for="item in items" :key="item.label" class="lk-fact">
      <dt>{{ item.label }}</dt>
      <dd class="d-flex flex-wrap align-items-center gap-2">
        <span :class="{ 'opacity-75 fw-normal fst-italic': item.verify }">{{ item.value }}</span>
        <VerifyTag v-if="item.verify" />
      </dd>
      <p v-if="item.detail" class="small mb-0 mt-1" style="color: var(--lk-ink-muted)">{{ item.detail }}</p>
    </div>
  </dl>
</template>

<script lang="ts" setup>
import type { Credential } from '@/content/types'
import VerifyTag from './VerifyTag.vue'

defineProps<{ items: Credential[] }>()
</script>
