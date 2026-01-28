<template>
  <section class="py-0 my-0">
    <!-- Sticky Menu -->
    <div class="position-sticky top-fixed-menu bg-light border-bottom" style="z-index: 100;">
      <ul class="nav justify-content-center gap-4 " id="scrollspy-menu">
        <li v-for="item in sections" :key="item.id" class="nav-item">
          <button
            class="nav-link fw-bold py-3 btn btn-link"
            @click="scrollToSection(item.id)"
            :class="{ active: activeId === item.id }"
          >
            {{ item.title }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Scroll Sections -->
    <div
      v-for="item in sections"
      :key="item.id"
      :id="item.id"
      class="scroll-section"
      :style="{ scrollMarginTop: topOffset + 'px' }"
    >
      <component :is="item.component" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
})

const activeId = ref('')
const topOffset = computed(() => window.innerWidth <= 768 ? 72 : 106)

const scrollToSection = (id) => {
  const section = document.getElementById(id)
  if (section) {
    const y = section.getBoundingClientRect().top + window.pageYOffset - topOffset.value
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

let scrollHandler

onMounted(() => {
  const sectionEls = document.querySelectorAll('.scroll-section')

  scrollHandler = () => {
    const scrollY = window.scrollY
    const offset = topOffset.value + 20
    let current = ''

    sectionEls.forEach(section => {
      if (scrollY >= section.offsetTop - offset) {
        current = section.getAttribute('id')
      }
    })

    activeId.value = current
  }

  window.addEventListener('scroll', scrollHandler)
  scrollHandler()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<style scoped>
.top-fixed-menu {
  top: 98px;
}
@media (max-width: 768px) {
  .top-fixed-menu {
    top: 70px;
  }
}

.nav-link {
  color: #111;
  font-weight: 500;
  padding-bottom: 0.25rem;
  margin-bottom: 0;
  border-radius: 0;
}

.nav-link.active {
  color: #ae3324 !important;
  border-bottom: 2px solid #ae3324;
  font-weight: 600;
}
</style>