<!-- components/TechStackTabs.vue -->
<template>
  <section class="bg-dark position-relative overflow-hidden" data-bs-theme="dark">
    <b-container class="pb-6 position-relative">
      <div class="inner-container-small text-center mb-4 mb-sm-5">
        <h2 class="mb-0 mt-3">{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>

      <b-row>
        <b-col lg="10" xl="8" xxl="6" class="mx-auto mb-6 mb-xl-7">
          <div class="bg-light rounded-pill p-2">
            <ul class="nav nav-pills nav-pills-primary nav-responsive justify-content-between">
              <li class="nav-item" v-for="tab in tabs" :key="tab.name" role="presentation">
                <button
                  class="nav-link rounded-pill icons-center"
                  :id="`tab-${tab.name}`"
                  @click="activeTab = tab.name"
                  :class="{ active: activeTab === tab.name }"
                >
                  {{ tab.label }}
                </button>
              </li>
            </ul>
          </div>
        </b-col>

        <b-col cols="11" class="mx-auto">
          <div class="tab-content">
            <div class="row justify-content-center">
              <div
                class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
                v-for="tech in filteredTechnologies"
                :key="tech.name"
              >
                <div class="text-center">
                  <img :src="tech.logo" :alt="tech.name" class="img-fluid mb-2" style="height: 60px;" />
                  <p class="mb-0">
                    <a :href="tech.link" class="text-decoration-underline text-white-50">{{ tech.name }}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { title, subtitle, tabs, technologies } = defineProps<{
  title: string
  subtitle: string
  tabs: { name: string; label: string }[]
  technologies: { name: string; logo: string; link: string; category: string }[]
}>()

const activeTab = ref(tabs[0]?.name || '')

const filteredTechnologies = computed(() =>
  technologies.filter(t => t.category === activeTab.value)
)
</script>