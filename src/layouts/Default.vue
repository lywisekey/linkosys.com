<template>
  <TopNavigationBar />
  <main>
    <slot />
  </main>
  <Footer />
</template>

<script lang="ts" setup>
import TopNavigationBar from './components/TopNavigationBar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
