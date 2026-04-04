<template>
  <section class="pb-0 bg-light py-8">
    <b-container data-sticky-container>
      <b-row>
        <b-col lg="4" class="mb-5">
          <CustomStickyElement data-sticky data-margin-top="180" data-sticky-for="576">
            <h2 class="mb-4">Trusted by Leading Organizations</h2>
            <p class="mb-4">
              We believe in going above and beyond to exceed. We reached
            </p>
            <div class="text-center d-inline-block bg-dark rounded px-5 py-3 mb-5">
              <span class="text-white me-1">Work with us?</span>
              <a class="ms-2" href="/contact"
                >Become a Partner
                <BIconChevronRight class="small" />
              </a>
            </div>
          </CustomStickyElement>
        </b-col>

        <b-col lg="8" class="ps-xl-7 pb-5">
          <b-row class="g-4 g-sm-5">
            <b-col md="6" v-for="(item, idx) in partners" :key="idx">
              <b-card no-body class="border bg-light p-5">
                <b-card-header class="bg-light p-0 mb-4">
                  <img :src="item.image" alt="" class="img-fluid" style="max-height: 60px;" />
                </b-card-header>

                <b-card-body class="p-0">
                  <h5 class="mb-3">
                    <a :href="item.link" class="stretched-link">
                      {{ item.title }}
                    </a>
                    
                  </h5>
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
import { partners } from '@/views/Linkosys/data/partner-data'
import { BIconChevronRight } from 'bootstrap-icons-vue'
</script>
