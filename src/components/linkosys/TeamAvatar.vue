<template>
  <!-- A real photograph is used whenever one is supplied. Until then the
       monogram keeps the grid coherent without standing in for a likeness. -->
  <div v-if="photo" class="lk-portrait">
    <img :src="photo" :alt="`${name}, ${role}`" loading="lazy" decoding="async" />
  </div>

  <div
    v-else
    class="lk-monogram"
    :style="{ '--lk-monogram-shift': `${shift}deg` }"
    role="img"
    :aria-label="`${name}, ${role}`"
  >
    <span class="lk-monogram-initials" aria-hidden="true">{{ initials }}</span>
    <span class="lk-monogram-rule" aria-hidden="true"></span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ name?: string; role?: string; photo?: string }>()

const initials = computed(() =>
  (props.name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
)

/**
 * Small deterministic hue shift per person so a grid of monograms has some
 * variation without any tile drifting off the navy palette.
 */
const shift = computed(() => {
  let hash = 0
  for (const char of props.name ?? '') hash = (hash * 31 + char.charCodeAt(0)) % 360
  return (hash % 14) - 7
})
</script>
