<template>
  <!-- Keyboard users can jump the navigation without tabbing the whole menu. -->
  <a class="lk-skip-link" href="#main">Skip to main content</a>
  <TopNavigationBar />
  <main id="main" tabindex="-1">
    <slot />
  </main>
  <Footer />
</template>

<script lang="ts" setup>
import TopNavigationBar from './components/TopNavigationBar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* The header is absolutely positioned, so anchored sections need clearance. */
:target {
  scroll-margin-top: 6rem;
}

#main:focus {
  outline: none;
}
</style>
