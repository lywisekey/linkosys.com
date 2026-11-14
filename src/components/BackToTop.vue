<template>
  <button
    ref="button"
    id="back-to-top"
    type="button"
    class="back-top arrow-none"
    aria-label="Back to top"
    title="Back to top"
    @click="backToTop"
  >
    <font-awesome-icon :icon="faArrowUp" />
  </button>
</template>

<script setup lang="ts">
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const button = ref<HTMLButtonElement | null>(null)
const updateVisibility = () => {
  button.value?.classList.toggle('back-top-show', window.scrollY >= 800)
}
onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', updateVisibility))

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  })
}
</script>
