<template>
  <section class="py-5">
    <b-container>
      <b-row>
        <b-col lg="12" class="mx-auto">
          <b-row class="g-4 g-lg-5 align-items-center">
           

            <b-col md="6" lg="7">
              <h2 class="mb-0">Your Trusted Technology Partner</h2>

              <p class="mb-4">
                With years of experience in delivering high-quality IT solutions, we help businesses streamline processes, optimize operations, and stay ahead in the digital era. From enterprise software to modern websites and mobile apps, our team is dedicated to your success.
              </p>
              <router-link :to="{ name: 'company.aboutus' }" class="btn btn-dark mb-0">
                Know more about us
              </router-link>
            </b-col>

            <b-col md="6" lg="5" class="text-center">
              <div
                class="icon-xxl bg-primary rounded-circle mx-auto mb-n7"
                style="width: 150px; height: 150px"
              ></div>
              <span class="heading-color fw-bold" style="font-size: 6rem; line-height: 1.25"
                >{{ yearsExperience }}</span
              >
              <h6 class="w-50 mx-auto">years in business</h6>
            </b-col>

            
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// Tính số năm từ 2016 đến hiện tại
const yearsExperience = computed(() => {
  const currentYear = new Date().getFullYear()
  return currentYear - 2016
})
</script>