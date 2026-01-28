<template>
  <section class="py-0 pt-lg-5 my-5">
    <b-container>
      <div class="inner-container-small text-center mb-4 mb-sm-5">
        <h2 class="mb-0">Explore, Learn, And Grow With Our Insightful Content</h2>
        <p class="mb-lg-4">
          Start your journey of discovery, where each article promotes growth and unlocks your true potential.
        </p>
      </div>

      <template v-if="blogs.length">
        <Swiper
          :modules="[Controller, Navigation, Pagination]"
          :autoplay="{ delay: 3000 }"
          :loop="false"
          :spaceBetween="30"
          :pagination="{ el: '.swiper-pagination' }"
          :breakpoints="{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
          }"
        >
          <SwiperSlide v-for="(blog, idx) in blogs.slice(0, 7)" :key="idx">
            <BlogCard :blog="blog" :length="blogs.length" :id="idx" />
          </SwiperSlide>
          <div class="swiper-pagination swiper-pagination-primary position-relative mt-4"></div>
        </Swiper>
      </template>

      <p v-else>Loading blog content...</p>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Controller, Navigation, Pagination } from 'swiper/modules'
import BlogCard from '@/views/Linkosys/components/homepage/BlogCard.vue'

interface BlogItem {
  title: string
  link: string
  description: string
  image: string
  date: string
  categories?: string[]
}

const blogs = ref<BlogItem[]>([])

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://www.techradar.com/feeds/tag/software`
    )
    if (!res.ok) throw new Error('Failed to fetch RSS feed')
    const json = await res.json()

    blogs.value = json.items.map((item: any) => {
      let image = ''

      if (item.enclosure?.link) {
        image = item.enclosure.link
      } else if (item.thumbnail) {
        image = item.thumbnail
      } else {
        const match = item.description?.match(/<img.*?src="(.*?)"/)
        if (match && match[1]) {
          image = match[1]
        }
      }

      return {
        title: item.title,
        link: item.link,
        description: item.description?.replace(/<[^>]+>/g, '').slice(0, 180) + '...',
        image: image || 'https://via.placeholder.com/600x400?text=TechRadar',
        date: item.pubDate,
        categories: item.categories
      }
    })
  } catch (e) {
    console.error(e)
  }
})
</script>