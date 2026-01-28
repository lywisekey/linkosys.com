<template>
  <section class="py-5 mt-5">
    <b-container>
      <div>
        <div class="inner-container-small text-center mb-4">
          <h3 class="h4 fw-bold">{{ sectionTitle }}</h3>
          <p class="text-muted">{{ sectionDesc }}</p>
        </div>
        <b-row class="g-4">
          <b-col v-for="(project, index) in projectList" :key="index" cols="12" sm="6" :lg="colg">
            <b-card no-body class="border overflow-hidden p-0 h-100 shadow-sm">
              <b-card-body class="p-sm-5">
                <h5 class="h6 mb-3">{{ project.title }}</h5>
                <p>{{ project.description }}</p>
                
                <a v-if="project.link" href="#" class="icon-link icon-link-hover stretched-link" >
                  Learn more <BIconArrowRight class="bi" />
                </a>
              </b-card-body>
              <b-card-footer class="p-0 ms-auto">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="img-fluid ms-5"
                  style="max-height: 260px; object-fit: cover;"
                />
              </b-card-footer>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { BIconArrowRight } from 'bootstrap-icons-vue'


defineProps({
  sectionTitle: String,
  sectionDesc: String,
  colg: String,
  projectList: {
    type: Array as PropType<
      {
        title: string
        description: string
        image: string
        icon?: any
        link?: string
      }[]
    >,
    required: true
  }
})
</script>