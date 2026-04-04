<template>
  <section
    class="position-relative overflow-hidden d-flex align-items-center bg-dark text-white"
    :style="`background-image:url(${linkosysBackgroundImg1}); background-position: center left; background-size: cover; min-height: 700px;`"
  >
    <!-- Overlay -->
    <div
      class="position-absolute top-0 start-0 w-100 h-100"
      style="background: rgba(0, 0, 0, 0.7);"
    ></div>

    <!-- Content centered -->
    <b-container class="position-relative z-1 pt-5">
      <b-row>
        <b-col sm="11" lg="8" xl="10">
          <h1 class="text-white h2 mb-3">
            Transform Your Business <br />
            <span class="text-gradient-primary">with Smart Digital Solutions</span>
          </h1>
          <p class="text-white mb-4">
            We design and build custom software, websites, and applications that drive growth and innovation.
          </p>
          <a
            class="btn btn-lg btn-outline-white icon-link icon-link-hover mb-0"
            href="/contact"
          >
            Get a Free Consultation
            <BIconArrowRight class="bi" />
          </a>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { BIconArrowRight } from 'bootstrap-icons-vue'
import linkosysBackgroundImg1 from '/images/bg/work.jpg'

</script>