<template>
  <b-card
    no-body
    class="overflow-hidden h-500px h-xl-700px rounded-0 pt-8"
    :style="`background-image:url(${linkosysBackgroundImg1}); background-position: center right; background-size: cover;`"
  >
    <div class="bg-overlay bg-dark opacity-5 d-lg-none"></div>

    <!-- Center vertically -->
    <div class="card-img-overlay d-flex align-items-center" style="min-height: 100%;">
      <b-container class="mt-7">
        <b-row>
          <b-col md="11" lg="7" xl="7">
            <h1 class="text-white h2 mb-3">
              Bespoke Solutions<br />
              <span class="text-gradient-primary">Uniquely Built for You</span>
            </h1>

            <p class="text-white mb-4">
              We excel in engineering resilient, scalable software solutions purpose-built to integrate seamlessly with your specific business workflows and existing systems.
            </p>

            
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
import linkosysBackgroundImg1 from '/images/bg/custom.jpg'
import { BIconArrowRight } from 'bootstrap-icons-vue'
</script>