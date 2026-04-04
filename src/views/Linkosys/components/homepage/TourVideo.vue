<template>
    <Jarallax
    tag="section"
    id="product-jarallax"
    custom-class="bg-parallax position-relative h-400px h-xl-600px"
    :options="{ videoLoop: true, videoSrc: 'https://www.youtube.com/watch?v=mOFoh9FUR8w' }"
    :custom-style="`background:url(${videoImg}) no-repeat; background-size:cover; background-position:center;`"
  >
    <div class="position-absolute top-50 start-50 translate-middle">
      <CustomGLightbox
        link="https://www.youtube.com/embed/mOFoh9FUR8w"
        class="btn btn-icon btn-xl btn-dark btn-round mb-0 stretched-link"
      >
        <BIconPlayFill class="fa-lg" />
      </CustomGLightbox>
    </div>
  </Jarallax>
</template>

<script lang="ts" setup>
import Jarallax from '@/components/Jarallax.vue'
import CustomGLightbox from '@/components/CustomGLightbox.vue'
import { BIconQuote, BIconStarFill, BIconPlayFill } from 'bootstrap-icons-vue'
import videoImg from '@/assets/images/bg/05.jpg'
</script>