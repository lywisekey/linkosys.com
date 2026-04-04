<template>
  <b-card
    no-body
    class="overflow-hidden h-500px h-xl-700px rounded-0 pt-8"
    :style="`background-image:url(${linkosysBackgroundImg1}); background-position: center center; background-size: cover; background-repeat: no-repeat;`"
  >
    <div class="bg-overlay bg-dark opacity-5 d-lg-none"></div>

    <!-- Center vertically -->
    <div class="card-img-overlay d-flex align-items-center" style="min-height: 100%;">
      <b-container class="mt-7">
        <b-row>
          <b-col md="11" lg="7" xl="7">
            <h1 class="text-white h2 mb-3">
              Our Projects<br />
              <span class="text-gradient-primary">Real Projects. Real Results</span>
            </h1>

            <p class="text-white mb-4">
              Each project we deliver is the result of close collaboration, deep technical expertise, and a strong focus on business outcomes. We turn your vision into reality — on time and on budget.
            </p>

           
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
import linkosysBackgroundImg1 from '/images/bg/projects.jpg'
</script>