<template>
  <section class="bg-dark pt-8 pt-sm-8 pb-6" 
  :style="`background-image:url(${linkosysBackgroundImg1}); background-position: center left; background-size: cover; background-repeat: no-repeat;`"
  data-bs-theme="dark">
    <b-container class="pt-5 pt-sm-5">
      <b-row class="g-4 g-xxl-5 justify-content-center">
        <b-col lg="10" class="text-center">
          <h1 class="mb-0 lh-base">About Linkosys</h1>
          <p class="mb-0 mt-2">
            Empowering businesses through innovative technology and unwavering partnership.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import linkosysBackgroundImg1 from '@/assets/images/linkosys/bg/01.jpg'
</script>
