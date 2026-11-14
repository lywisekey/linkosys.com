<template>
  <button
    id="back-to-top"
    type="button"
    class="back-top arrow-none"
    aria-label="Back to top"
    title="Back to top"
    @click="backToTop"
  >
    <font-awesome-icon :icon="faArrowUpLong" />
  </button>
</template>

<script setup lang="ts">
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons'
import { onMounted } from 'vue'

onMounted(() => {
  const backBtn = document.getElementById('back-to-top')
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 800) {
        backBtn.classList.add('back-top-show')
      } else {
        backBtn.classList.remove('back-top-show')
      }
    })
  }
})

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
