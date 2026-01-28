<template>
  <section class="m-0 py-5">
    <b-container class="py-2 pt-sm-5">
      <b-row>
        <b-col md="6" xl="7" class="mb-5 mb-md-0">
          <p class="mb-0">
            <BIconShieldCheck class="mb-1" />
            | We believe in going above and beyond to exceed. We reached
          </p>

          <Swiper
            class="mt-2 mt-md-4"
            :modules="[Autoplay]"
            :loop="true"
            :slidesPerView="2"
            :spaceBetween="30"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: false
            }"
            :breakpoints="{
              576: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 3 }
            }"
            wrapperClass="align-items-center"
          >
            <SwiperSlide v-for="(image, idx) in clientImages" :key="idx">
              <img :src="image" class="px-3" :class="!idx && 'ps-0'" alt="client-img" />
            </SwiperSlide>
          </Swiper>
        </b-col>

        <b-col md="6" lg="6" xl="5" class="ms-auto text-md-end">
          <p class="mb-0 me-2">Trusted by Customers <span class="badge bg-dark">Active</span></p>

          <div class="d-flex justify-content-md-end mt-2 mt-md-4">
            <div>
              <div class="d-flex justify-content-md-end">
                <h4 class="purecounter mb-0">
                  <Vue3autocounter
                    ref="counter"
                    :startAmount="0"
                    :endAmount="100"
                    suffix="+"
                    :duration="3"
                  />
                </h4>
              </div>
              <p class="mb-0">Projects done</p>
            </div>

            <div class="vr mx-3 mx-sm-4"></div>
            <div>
              <div class="d-flex justify-content-md-end">
                <h4 class="purecounter mb-0">
                  <Vue3autocounter ref="counter" :startAmount="0" :endAmount="60" :duration="3" />
                </h4>
                <span class="h4 mb-0">+</span>
              </div>
              <p class="mb-0">Client's projects complete</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import Vue3autocounter from 'vue3-autocounter'
import {
  BIconFire,
  BIconLifePreserver,
  BIconShieldCheck,
  BIconStopwatch
} from 'bootstrap-icons-vue'

import client0 from '@/assets/images/client/stixis-logo.png'
import client01 from '@/assets/images/client/letcore.png'

import client1 from '@/assets/images/client/anc-logo.png'
import client2 from '@/assets/images/client/bresatech-logo.png'
import client3 from '@/assets/images/client/fat-logo.png'
import client4 from '@/assets/images/client/itms-logo.png'
import client5 from '@/assets/images/client/sonypicture-logo.png'

const clientImages = [client0, client01, client1, client2, client3, client4, client5]
</script>
