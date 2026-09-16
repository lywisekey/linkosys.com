<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle arrow-none d-flex justify-content-between align-items-center w-100"
      href="#"
      :class="{ active: isActive }"
      @click.prevent
    >
      {{ section.label }}
      <font-awesome-icon :icon="faAngleDown" class="fa-sm ms-1" />
    </a>

    <div class="dropdown-menu p-3" :class="section.columns ? 'dropdown-menu-size-lg' : ''">
      <b-row>
        <b-col v-for="(chunk, index) in columns" :key="index" :sm="section.columns ? 6 : 12">
          <ul class="list-unstyled mb-0">
            <li v-for="link in chunk" :key="link.label">
              <router-link class="dropdown-item" :to="link.to">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </b-col>

        <b-col v-if="section.footer" cols="12">
          <hr class="mt-2 mb-2" />
          <router-link class="dropdown-item fw-semibold" :to="section.footer.to">
            {{ section.footer.label }} &rarr;
          </router-link>
        </b-col>
      </b-row>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { primaryLinks, type NavSection } from './menu'

const props = defineProps<{ section: NavSection }>()

// useRoute() is reactive. The previous menu read router.currentRoute once during
// setup, so the active state never updated after a client-side navigation.
const route = useRoute()

const columns = computed(() => {
  const count = props.section.columns ?? 1
  if (count === 1) return [props.section.links]

  const perColumn = Math.ceil(props.section.links.length / count)
  return Array.from({ length: count }, (_, index) =>
    props.section.links.slice(index * perColumn, (index + 1) * perColumn)
  ).filter((chunk) => chunk.length)
})

// Routes that own a top-level nav item (Government) also appear inside a
// dropdown for discoverability. Without this exclusion both items highlight at
// once on those pages.
const topLevelNames = new Set(
  primaryLinks.map((link) => (link.to as { name?: string }).name).filter(Boolean)
)

const isActive = computed(() =>
  props.section.links.some((link) => {
    const target = link.to as { name?: string; params?: { slug?: string } }
    if (!target?.name) return false
    if (topLevelNames.has(target.name)) return false
    if (target.name !== route.name) return false
    if (target.params?.slug) return target.params.slug === route.params.slug
    return true
  })
)
</script>
