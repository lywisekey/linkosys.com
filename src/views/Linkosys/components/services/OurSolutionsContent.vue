<template>
  <section class="pt-5">
    <b-container>

      <b-row class="g-3 mt-5">
        <b-col sm="12" lg="9">
          <div class="text-left mb-6 border-half pb-0">
            <h2 class="h4 mb-">{{ title }}</h2>
            <p class="mb-0">{{ description }}</p>
          </div>
        </b-col>
      </b-row>
      
      <b-row class="g-3">
        <b-col sm="6" lg="4" v-for="(item, idx) in items" :key="idx">
          <b-card no-body class="bg-transparent p-0">
            <div
                  class="icon-md flex-shrink-0 text-primary bg-primary bg-opacity-10 rounded-circle flex-centered my-3"
                >
              <component :is="item.icon" class="fa-xl" />
            </div>
            <h6>{{ item.title }}</h6>
            <p class="mb-0">{{ item.description }}</p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>


<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
  title: string
  description: string
  items: {
    icon: any
    title: string
    description: string
  }[]
}>()
</script>


<style>
.border-half::after {
  content: '';
  display: block;
  width: 60%;
  height: 2px;
  background-color: #dee2e6;
  margin-top: 1rem;
}
</style>