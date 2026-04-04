<template>
  <article class="card card-img-scale border p-2 h-100">
    <div class="card-img-scale-wrapper position-relative rounded overflow-hidden">
      <img :src="blog.image" class="card-img img-scale" alt="service img" />
      <div class="badge text-bg-dark position-absolute top-0 start-0 m-3">
        <span
          v-for="(cat, catIdx) in blog.categories"
          :key="catIdx"
          class="badge text-bg-dark me-1"
        >
          {{ cat }}
        </span>
      </div>
    </div>

    <b-card-body class="d-flex flex-column px-2">
      <div class="small mb-3 icons-center">
        {{ blog.date }}
      </div>
      <b-card-title tag="h6" class="mb-3">
        <template v-if="blog.link">
          <a
            :href="blog.link"
            class="stretched-link"
            target="_blank"
            rel="noopener"
          >
            {{ blog.title }}
          </a>
        </template>
        <template v-else-if="blog.route">
          <router-link :to="blog.route" class="stretched-link">
            {{ blog.title }}
          </router-link>
        </template>
        <template v-else>
          {{ blog.title }}
        </template>
      </b-card-title>
    </b-card-body>
  </article>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { BlogType } from '@/types'

defineProps({
  blog: {
    type: Object as PropType<BlogType>,
    required: true
  }
})
</script>