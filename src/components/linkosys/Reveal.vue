<template>
  <div ref="el" :class="{ 'lk-reveal': armed, 'is-visible': visible }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const armed = ref(false)
const visible = ref(false)
let observer: IntersectionObserver | null = null

/**
 * Content is visible by default and only opts into the entrance animation once
 * this component has mounted.
 *
 * The hiding class used to be static, which meant the prerendered markup sat at
 * opacity 0 until the bundle loaded and the observer fired — with hydration
 * deferred to the load event that left most of the page blank and then popping
 * in. It also hid real content from anything that renders the page without
 * running to completion.
 *
 * Elements already on screen when we mount are left alone: arming them would
 * hide content the visitor is looking at. Only what is still below the fold
 * animates, and that happens off-screen where there is nothing to flash.
 */
onMounted(() => {
  const node = el.value
  if (!node) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !('IntersectionObserver' in window)) return

  if (node.getBoundingClientRect().top < window.innerHeight) return

  armed.value = true
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true
          observer?.disconnect()
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px' }
  )
  observer.observe(node)
})

onBeforeUnmount(() => observer?.disconnect())
</script>
