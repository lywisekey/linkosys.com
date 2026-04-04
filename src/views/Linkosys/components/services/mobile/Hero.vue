<template>
  <b-card
    no-body
    class="overflow-hidden h-500px h-xl-700px rounded-0 pt-8"
    :style="`background-image:url(${linkosysBackgroundImg1}); background-position: center right; background-size: cover; background-repeat: no-repeat;`"
  >
    <div class="bg-overlay bg-dark opacity-5 d-lg-none"></div>

    <!-- Center vertically -->
    <div class="card-img-overlay d-flex align-items-center" style="min-height: 100%;">
      <b-container class="mt-7">
        <b-row>
          <b-col md="11" lg="7" xl="7">
            <h1 class="text-white h2 mb-3">
              Mobile-First
              <span class="text-gradient-primary">App Solutions</span> Engineered with Excellence
            </h1>

            <p class="text-white mb-4">
              As a leading mobile app development company, Orient Software guides businesses of all sizes in their journey to go mobile. We create feature-rich, secure, and scalable apps that deliver high-performance mobile experiences across multiple platforms.
            </p>

           
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
import linkosysBackgroundImg1 from '/images/bg/mobile.jpg'
import { BIconArrowRight } from 'bootstrap-icons-vue'
</script>