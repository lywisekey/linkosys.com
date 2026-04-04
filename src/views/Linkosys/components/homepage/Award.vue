<template>
  <section class="bg-dark mt-0 pt-0" data-bs-theme="dark">
    <b-container>
      <div class="inner-container-small m-0 mb-3">
        <h2 class="mb-2">Award</h2>
        <p class="mb-0">
          We have been given awards to work with the federal government and states.
        </p>
      </div>

      <b-row>
        <b-col cols="12">
          <template v-for="(award, idx) in awards" :key="idx">
            <!-- <hr v-if="!idx" /> -->
            <hr />
            <b-row class="align-items-top position-relative py-4">
              <b-col md="2" class="mb-3 mb-md-0">
                <img :src="award.image" class="h-60px" alt="award icon" />
              </b-col>

              <b-col md="4" class="mb-3 mb-md-0">
                <h5 class="mb-0 h6 position-relative">
                  <template v-if="award.imagepop">
                    <CustomGLightbox :link="award.imagepop">
                      {{ award.title }}
                      <BIconFileImage class="ms-2" />
                    </CustomGLightbox>
                  </template>
                  <template v-else-if="award.link">
                    <a
                      :href="award.link"
                      class="stretched-link"
                    >
                      {{ award.title }}
                      <BIconBoxArrowUpRight class="ms-2" />
                    </a>
                  </template>
                </h5>
              </b-col>

              <b-col md="6" class="ms-auto">
                <p class="mb-0" v-html="award.description"></p>
              </b-col>
            </b-row>
            
          </template>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import { awards } from '@/views/Linkosys/data/homepage-data'
import CustomGLightbox from '@/components/CustomGLightbox.vue'
import { BIconBoxArrowUpRight, BIconFileImage, BIconQuote } from 'bootstrap-icons-vue'

</script>
