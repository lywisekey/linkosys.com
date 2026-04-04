<template>
  <section class="pt-5">
    <b-container>
      <b-row>
        <b-col lg="11" class="mx-auto">
          <b-row class="g-4 g-lg-5 align-items-center">
            <b-col md="6" lg="4" class="text-center">
              <div
                class="icon-xxl bg-primary rounded-circle mx-auto mb-n7"
                style="width: 150px; height: 150px"
              ></div>
              <span class="heading-color fw-bold" style="font-size: 6rem; line-height: 1.25"
                >...</span
              >
              <h6 class="w-50 mx-auto">Updating</h6>
            </b-col>

            <b-col md="8" lg="6">
              <h6 class="text-body fw-normal">Comming Soon</h6>
              <h3 class="fs-5">We’re working hard behind the scenes to bring you an exceptional experience. Stay tuned — our new website is launching soon!</h3>
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