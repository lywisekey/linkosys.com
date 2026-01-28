<template>
  <section class="pt-8 pt-sm-8 pb-6 position-relative overflow-hidden d-flex" 
  :style="`background-image:url(${linkosysBackgroundImg1}); background-position: center center; background-size: cover; background-repeat: no-repeat; background-color: #0c0c0f;`"
  data-bs-theme="dark">
   <!-- Overlay -->
    <div
      class="position-absolute top-0 start-0 w-100 h-100"
      style="background: rgba(0, 0, 0, 0.7);"
    ></div>
    <b-container class="position-relative z-1 pt-5">
      <b-row class="inner-container-small g-4 g-xxl-5 justify-content-center">
        <b-col lg="10" class="text-center">
          <h1 class="mb-0 lh-base">Contact Us</h1>
          <p class="mb-0 mt-2">
            Ready to innovate? Get in touch with Linkosys to explore how we can support your digital goals with the right tech solutions.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import linkosysBackgroundImg1 from '/images/bg/map.jpg'
</script>
