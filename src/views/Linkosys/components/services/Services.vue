<template>
  <section class="py-6">
    <b-container>
      <b-row class="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <b-col v-for="(service, idx) in services" :key="idx">
          <ServiceCard :service="service" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
// Import kiểu dữ liệu nếu bạn đang dùng TypeScript interface
// import type { ServiceType } from '@/types/service'

import { defineProps } from 'vue'
import ServiceCard from '@/views/Linkosys/components/services/ServiceCard.vue'

const props = defineProps<{
  services: any[] // hoặc ServiceType[] nếu bạn đã khai báo kiểu
}>()
</script>