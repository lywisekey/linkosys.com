<template>
  <section class="bg-light">
    <b-container>
      <b-row class="mb-4 mb-md-7">
        <b-col md="6" lg="5">
          <h2 class="mb-0">We provide top IT solutions</h2>
        </b-col>

        <b-col md="6" lg="5" class="ms-auto">
          <p>
            We provide end-to-end software development backed by industry-specific expertise, advisory support, and
            system maintenance, including maintenance of complex legacy solutions. Our software engineering services
            encompass both the classic outsourcing model and staff augmentation.
          </p>

          <div class="d-flex gap-3 position-relative mt-3">
            <button type="button" class="btn btn-white border btn-icon rounded-circle mb-0 swiper-button-prev-team">
              <BIconArrowLeft />
            </button>
            <button type="button" class="btn btn-white border btn-icon rounded-circle mb-0 swiper-button-next-team">
              <BIconArrowRight />
            </button>
          </div>
        </b-col>
      </b-row>

      <Swiper class="pb-4" :modules="[Navigation]" :spaceBetween="24" :loop="false" :centeredSlides="false"
        :autoplay="{ delay: 2000 }" :navigation="{
          nextEl: '.swiper-button-next-team',
          prevEl: '.swiper-button-prev-team'
        }" :breakpoints="{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1200: { slidesPerView: 3 }
        }">
        <SwiperSlide v-for="(service, idx) in services" :key="idx">
          <ServiceCard :service="service" />
        </SwiperSlide>
      </Swiper>
      <div class="d-flex align-items-center gap-2 mt-6">
        <ul class="avatar-group mb-0">
          <li class="avatar avatar-sm">
            <img class="avatar-img rounded-circle" :src="avatar6" alt="avatar" />
          </li>
          <li class="avatar avatar-sm">
            <img class="avatar-img rounded-circle" :src="avatar5" alt="avatar" />
          </li>
          <li class="avatar avatar-sm">
            <div class="avatar-img rounded-circle text-bg-dark">
              <BIconTelephone class="text-white position-absolute top-50 start-50 translate-middle" />
            </div>
          </li>
        </ul>
        <p class="fw-normal mb-0">
          Maximize Productivity by Simplifying Solution Search
          <!-- <a href="#" class="text-decoration-underline text-primary-hover fw-semibold">Got a project in mind?</a> -->
        </p>
      </div>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import { BIconArrowLeft, BIconArrowRight, BIconTelephone } from 'bootstrap-icons-vue'
import ServiceCard from '@/views/Linkosys/components/homepage/ServiceCard.vue'
import { services } from '@/views/Linkosys/data/homepage-data'

import avatar5 from '@/assets/images/avatar/george.png'
import avatar6 from '@/assets/images/avatar/phong.png'
</script>
