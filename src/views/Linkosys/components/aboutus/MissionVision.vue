<template>
  <section class="py-0">
    <b-container>
        <div class="p-5 bg-black text-white rounded-4">
      <b-row>
        <!-- LEFT: Title + Description -->
        <b-col lg="4" class="mb-4 mb-lg-0 pe-lg-5">
    
          <h2 class="fw-bold h3 lh-sm text-primary">
            {{ content.headingTitle }}
            <span class="d-block">{{ content.headingSubtitle }}</span>
          </h2>
          <p class="mt-3">{{ content.description1 }}</p>
          <p>{{ content.description2 }}</p>
        </b-col>

        <!-- RIGHT: Mission & Vision -->
        <b-col lg="8">
          <b-row>
            <b-col md="6" class="mb-4">
              <div class="bg-light text-dark rounded-4 p-4 h-100 shadow-sm">
                <div
                  class="icon-md flex-shrink-0 text-primary bg-primary bg-opacity-10 rounded-circle flex-centered my-3"
                >
                  <component :is="content.mission.icon" class="fa-xl" />
                </div>
                <h5 class="fw-semibold">{{ content.mission.title }}</h5>
                <p class=" small">{{ content.mission.description }}</p>
              </div>
            </b-col>

            <b-col md="6" class="mb-4">
              <div class="bg-light text-dark rounded-4 p-4 h-100 shadow-sm">
                <div
                  class="icon-md flex-shrink-0 text-primary bg-primary bg-opacity-10 rounded-circle flex-centered my-3"
                >
                  <component :is="content.vision.icon" class="fa-xl" />
                </div>
                <h5 class="fw-semibold ">{{ content.vision.title }}</h5>
                <p class="small">{{ content.vision.description }}</p>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      </div>
    </b-container>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  content: {
    headingTitle: string
    headingSubtitle: string
    description1: string
    description2: string
    mission: {
      title: string
      icon: string
      description: string
    }
    vision: {
      title: string
      icon: string
      description: string
    }
  }
}>()
</script>