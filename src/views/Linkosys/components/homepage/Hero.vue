<template>
  <section
    class="position-relative overflow-hidden d-flex align-items-center bg-dark text-white"
    style="min-height: 700px;"
  >
    <!-- Video background -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
    >
      <source src="/videos/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Overlay -->
    <div
      class="position-absolute top-0 start-0 w-100 h-100"
      style="background: rgba(0, 0, 0, 0.7);"
    ></div>

    <!-- Content centered -->
    <b-container class="position-relative text-center z-1 p-3 pt-5">
      <b-row>
        <b-col>
          <h1 class="text-white h2 mb-3">
            Transform Your Business <br />
            <span class="text-gradient-primary">with Smart Digital Solutions</span>
          </h1>
          <p class="text-white mb-4">
            We design and build custom software, websites, and applications that drive growth and innovation.
          </p>
          <router-link
                  class="btn btn-lg btn-outline-white icon-link icon-link-hover mb-0"
                  :to="{ name: 'contact'}"
                >
                  Get a Free Consultation
                </router-link>
          
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { BIconArrowRight } from 'bootstrap-icons-vue'
</script>