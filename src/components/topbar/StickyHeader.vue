<template>
  <header :class="`${isSticky ? 'header-sticky-on' : ''} ${className}`">
    <slot />
  </header>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

type StickyHeaderProps = {
  className?: string
}

const isSticky = ref(false)
const updateSticky = () => { isSticky.value = window.scrollY >= 200 }
onMounted(() => {
  updateSticky()
  window.addEventListener('scroll', updateSticky, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', updateSticky))

defineProps<StickyHeaderProps>()
</script>
