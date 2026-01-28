<template>
  <article
    class="card card-hover-shadow border p-3"
    :class="length - 1 === id ? '' : 'mb-4'"
  >
    <b-row>
      <b-col md="4" class="pt-4">
        <img
          :src="blog.image || '/placeholder.jpg'"
          class="img-fluid card-img"
          :alt="blog.title || 'Blog image'"
        />
      </b-col>
      <b-col md="8">
        <b-card-body class="d-flex flex-column h-100 ps-0 pe-3">
          <!-- Categories as multiple badges -->
          <div class="mb-2">
            <span
              v-for="(cat, catIdx) in blog.categories"
              :key="catIdx"
              class="badge text-bg-dark me-1"
            >
              {{ cat }}
            </span>
          </div>

          <b-card-title tag="h5" class="mb-3 h6 mb-md-0">
            {{ blog.title }}
          </b-card-title>
          <p>{{ blog.description }}</p>
          <div class="d-sm-flex justify-content-between align-items-center mt-auto">
            
            <p class="my-2 fw-lighter mb-0">
              {{ blog.date }}
            </p>

            <template v-if="blog.route">
              <a
                :href="$router.resolve(blog.route).href"
                target="_blank"
                rel="noopener"
                class="icon-link icon-link-hover stretched-link"
              >
                Read more
                <BIconArrowRight />
              </a>
            </template>
            <template v-else-if="blog.link">
              <a
                :href="blog.link"
                class="icon-link icon-link-hover stretched-link"
                target="_blank"
                rel="noopener"
              >
                Read more
                <BIconArrowRight />
              </a>
            </template>
          </div>
        </b-card-body>
      </b-col>
    </b-row>
  </article>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { BIconArrowRight } from 'bootstrap-icons-vue'

interface BlogCardType {
  title: string
  categories?: string[]
  description?: string
  image?: string
  link?: string,
  date?: string,
  route?: any,
  publishedBy?: string
}

defineProps({
  blog: {
    type: Object as PropType<BlogCardType>,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})
</script>