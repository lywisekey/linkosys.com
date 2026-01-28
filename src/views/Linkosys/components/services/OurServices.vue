<template>
  <section class="pb-0 bg-light">
    <b-container data-sticky-container>
      <b-row>
        <b-col lg="4" class="mb-5">
          <CustomStickyElement data-sticky data-margin-top="180" data-sticky-for="576">
            <h2 class="mb-4">We provide top IT solutions</h2>
            <p class="mb-8 pb-5">
              Constantly seeking optimal solutions to enhance product quality, reduce costs, and streamline production for clients.
            </p>
          </CustomStickyElement>
        </b-col>

        <b-col lg="8" class="ps-xl-7 pb-5">
          <b-row class="g-4 g-sm-5">
            <b-col md="6" v-for="(item, idx) in services" :key="idx">
              <b-card no-body class="border bg-light p-5">
                <b-card-header class="bg-light p-0 mb-4">
                  <div
                        class="icon-md flex-shrink-0 text-primary bg-primary bg-opacity-10 rounded-circle flex-centered"
                      >
                    <component :is="item.icon" class="fa-xl" />
                  </div>
                </b-card-header>

                <b-card-body class="p-0">
                  
                  <h6>{{ item.title }}</h6>
                  <p class="mb-0">{{ item.description }}</p>

                  
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import CustomStickyElement from '@/components/CustomStickyElement.vue'
import { services, lists } from '@/views/Linkosys/data/services-data'
import { BIconChevronRight } from 'bootstrap-icons-vue'
</script>
