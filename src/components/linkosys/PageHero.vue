<template>
  <section class="lk-dark lk-grid-bg pt-8 pb-7">
    <b-container>
      <nav v-if="crumbs?.length" aria-label="Breadcrumb" class="mb-4">
        <ol class="list-unstyled d-flex flex-wrap gap-2 mb-0 small">
          <li>
            <router-link :to="{ name: 'homepage' }" class="text-reset opacity-75">Home</router-link>
          </li>
          <li v-for="crumb in crumbs" :key="crumb.label" class="d-flex gap-2">
            <span aria-hidden="true" class="opacity-50">/</span>
            <router-link v-if="crumb.to" :to="crumb.to" class="text-reset opacity-75">{{ crumb.label }}</router-link>
            <span v-else aria-current="page">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>

      <b-row class="g-5 align-items-center">
        <b-col :lg="$slots.aside ? 7 : 12">
          <p v-if="eyebrow" class="lk-eyebrow">{{ eyebrow }}</p>
          <h1 class="lk-display display-5 mb-4">{{ title }}</h1>
          <p v-if="lead" class="lk-lead mb-0" style="font-size: 1.25rem">{{ lead }}</p>

          <div v-if="$slots.actions" class="d-flex flex-wrap gap-3 mt-5">
            <slot name="actions" />
          </div>
        </b-col>

        <b-col v-if="$slots.aside" lg="4" class="ms-auto">
          <slot name="aside" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  eyebrow?: string
  title: string
  lead?: string
  crumbs?: { label: string; to?: RouteLocationRaw }[]
}>()
</script>
