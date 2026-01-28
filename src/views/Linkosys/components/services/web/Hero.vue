<template>
  <b-card
    no-body
    class="overflow-hidden h-500px h-xl-700px rounded-0 pt-8"
    :style="`background-image:url(${linkosysBackgroundImg1}); background-position: bottom right; background-size: cover; background-repeat: no-repeat;`"
  >
    <div class="bg-overlay bg-dark opacity-5 d-lg-none"></div>

    <!-- Center vertically -->
    <div class="card-img-overlay d-flex align-items-center" style="min-height: 100%;">
      <b-container class="mt-7">
        <b-row>
          <b-col md="11" lg="7" xl="7">
            <h1 class="text-white h2 mb-3">
              A Powerhouse for<br />
              <span class="text-gradient-primary">Innovative Web-Based Solutions</span>
            </h1>

            <p class="text-white mb-4">
              We are your trusted partner for end-to-end web app development services and solutions that cater to diverse demands and accelerate your digital business.
            </p>

           
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
import linkosysBackgroundImg1 from '/images/bg/web.jpg'
import { BIconArrowRight } from 'bootstrap-icons-vue'
</script>