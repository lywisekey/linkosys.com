<template>
  <section
    class="bg-dark pt-8 pt-sm-8 pb-6"
    :style="`background-image:url(${background}); background-position: center left; background-size: cover; background-repeat: no-repeat;`"
    data-bs-theme="dark"
  >
    <b-container class="pt-5 pt-sm-5">
      <b-row class="g-4 g-xxl-5 justify-content-center">
        <b-col lg="10" class="text-center">
          <div class="d-flex justify-content-center mb-3" v-if="breadcrumbs?.length">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-dots pb-0 mb-0">
                <li
                  v-for="(item, index) in breadcrumbs"
                  :key="index"
                  :class="['breadcrumb-item', { active: !item.href }]"
                >
                  <template v-if="item.href">
                    <a :href="item.href">{{ item.label }}</a>
                  </template>
                  <template v-else>
                    {{ item.label }}
                  </template>
                </li>
              </ol>
            </nav>
          </div>
          <h1 class="mb-3 text-white">{{ title }}</h1>
          <p class="text-white-50" v-if="subtitle">{{ subtitle }}</p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  background: string
}>()
</script>