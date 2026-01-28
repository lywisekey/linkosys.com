<template>
  <section>
    <b-container>
      <div class="inner-container-small mx-auto">
        <div class="text-center mb-6">
          <h2 class="mb-">Commitment to Services</h2>
          <p class="mb-0">
            At Linkosys, we prioritize customers as the key to our future. Serving and fulfilling their business needs is our core responsibility, forming the foundation of our reliance on them.
          </p>
        </div>
      </div>
      <b-row class="g-3 mt-5">
        <b-col sm="6" lg="4" v-for="(item, idx) in commitment" :key="idx">
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
import { commitment, lists } from '@/views/Linkosys/data/services-data'

</script>
