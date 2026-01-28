<template>
  <section class="p-0 pb-3">
    <!-- :modules="[Autoplay, Pagination]" -->
    <Swiper
      class="overflow-hidden"
      loop
      :modules="[Pagination]"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false
      }"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true
      }"
    >
      <SwiperSlide>
        <b-card
          no-body
          class="overflow-hidden h-700px h-xl-750px rounded-0"
          :style="`background-image:url(${linkosysBackgroundImg1}); background-position: center left; background-size: cover;`"
        >
        
          <div class="bg-overlay bg-dark opacity-5 d-lg-none"></div>
          <div class="card-img-overlay d-flex align-items-center">
            <b-container>
              <b-row class="pt-8 pt-md-0">
                <b-col sm="11" lg="8" xl="10">
                  <h1 class="text-white display-5 mb-3">
                    Transform Your Business <br /><span class="text-gradient-primary">with Smart Digital Solutions</span>
                  </h1>

                  <p class="text-white mb-4">
                    We design and build custom software, websites, and applications that drive growth and innovation.
                  </p>
                  <a class="btn btn-lg btn-outline-white icon-link icon-link-hover mb-0" href="#"
                    >Get a Free Consultation <BIconArrowRight class="bi" />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </b-card>
      </SwiperSlide>

      <!-- <SwiperSlide>
        <b-card
          no-body
          class="overflow-hidden h-700px h-xl-750px rounded-0"
          :style="`background-image:url(${linkosysBackgroundImg2}); background-position: center left; background-size: cover;`"
        >
          <div class="bg-overlay bg-dark opacity-5 d-lg-none"></div>
          <div class="card-img-overlay d-flex align-items-center">
            <b-container>
              <b-row>
                <b-col md="11" lg="9" xl="10" class="ms-auto">
                  <h1 class="text-white display-5 mb-3">
                    Empowering Growth<br /><span class="text-gradient-primary">Through Smart Solutions</span>
                  </h1>

                  <p class="text-white mb-4">
                    Mobile apps, web platforms, AI solutions, and more — built to drive your business forward.
                  </p>
                  <a class="btn btn-lg btn-dark icon-link icon-link-hover mb-0" href="#"
                    >Read more<BIconArrowRight class="bi" />
                  </a>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </b-card>
      </SwiperSlide> -->

      <div class="swiper-pagination swiper-pagination-line position-absolute bottom-0 mb-3"></div>
    </Swiper>
  </section>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules'
import { BIconArrowRight } from 'bootstrap-icons-vue'

import linkosysBackgroundImg1 from '@/assets/images/linkosys/bg/01.jpg'
import linkosysBackgroundImg2 from '@/assets/images/linkosys/bg/02.jpg'
</script>
