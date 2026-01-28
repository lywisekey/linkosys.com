<template>
  <section class="pt-5 mt-0">
    <b-container>
      <b-row class="g-xl-7 mt-0">
        <b-col lg="8" class="pt-0 mt-0">
          <template v-if="paginatedBlogs.length">
            <BlogCard
              v-for="(blog, idx) in paginatedBlogs"
              :key="idx"
              :blog="blog"
              :length="paginatedBlogs.length"
              :id="idx"
            />
          </template>
          <template v-else>
            <p v-if="error">{{ error }}</p>
            <p v-else>Loading...</p>
          </template>

          <!-- Pagination -->
          <ul class="pagination pagination-primary-soft d-flex justify-content-center flex-wrap mb-0 pt-5">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)">
                Prev
              </button>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(currentPage + 1)">
                Next
              </button>
            </li>
          </ul>
        </b-col>

        <b-col lg="4" class="mt-5 mt-lg-0">
          <BlogSidebar />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BlogCard from '@/views/Linkosys/components/blogs/listsidebar/BlogCard.vue'
import BlogSidebar from '@/views/Linkosys/components/blogs/listsidebar/BlogSidebar.vue'

interface BlogItem {
  title: string
  link: string
  description: string
  image: string
  date: string
}

const blogs = ref<BlogItem[]>([])
const perPage = 6
const currentPage = ref(1)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://www.techradar.com/feeds/tag/software`
    )
    if (!res.ok) throw new Error('Failed to fetch RSS feed')
    const json = await res.json()
    blogs.value = json.items.map((item: any) => {
      let image = ''
      // Thử lấy ảnh từ content hoặc description
      const match = item.description.match(/<img.*?src="(.*?)"/)
      if (match && match[1]) {
        image = match[1]
      } else if (item.thumbnail) {
        image = item.thumbnail
      }
      return {
        title: item.title,
        link: item.link,
        description: item.description.replace(/<[^>]+>/g, '').slice(0, 180) + '...',
        image: image || 'https://via.placeholder.com/600x400?text=TechRadar',
        date: item.pubDate,
        publishedBy: item.author,
        categories: item.categories
      }
    })
  } catch (e: any) {
    error.value = e.message
  }
})

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return blogs.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(blogs.value.length / perPage))

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>