<template>
  <li ref="dropdown" class="nav-item dropdown lk-nav-section" :class="{ 'lk-nav-open': open }"
    @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @focusout="onFocusOut"
    @keydown.esc.prevent.stop="closeAndFocus">
    <button
      ref="trigger"
      type="button"
      class="nav-link dropdown-toggle arrow-none d-flex justify-content-between align-items-center w-100"
      :class="{ active: isActive }"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="open = !open"
    >
      {{ section.label }}
      <font-awesome-icon :icon="faAngleDown" class="fa-sm ms-1" />
    </button>

    <div :id="panelId" class="dropdown-menu p-3" :class="section.columns ? 'dropdown-menu-size-lg' : ''">
      <div class="lk-nav-cols" :style="{ '--lk-nav-columns': section.columns ?? 1 }">
        <ul v-for="(chunk, index) in columns" :key="index" class="list-unstyled mb-0">
          <li v-for="link in chunk" :key="link.label">
            <router-link class="dropdown-item" :to="link.to">
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>

      <template v-if="section.footer">
        <hr class="mt-2 mb-2" />
        <router-link class="dropdown-item fw-semibold" :to="section.footer.to">
          {{ section.footer.label }} &rarr;
        </router-link>
      </template>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { primaryLinks, type NavSection } from './menu'

const props = defineProps<{ section: NavSection }>()

// useRoute() is reactive. The previous menu read router.currentRoute once during
// setup, so the active state never updated after a client-side navigation.
const route = useRoute()
const open = ref(false)
const dropdown = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const panelId = computed(() => `lk-menu-${props.section.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
const isDesktop = () => window.matchMedia('(min-width: 1200px) and (hover: hover)').matches
const onMouseEnter = () => { if (isDesktop()) open.value = true }
const onMouseLeave = () => {
  if (isDesktop() && !dropdown.value?.contains(document.activeElement)) open.value = false
}
const onFocusOut = (event: FocusEvent) => {
  if (!dropdown.value?.contains(event.relatedTarget as Node | null)) open.value = false
}
const closeAndFocus = () => { open.value = false; trigger.value?.focus() }
const onOutsideClick = (event: MouseEvent) => {
  if (!dropdown.value?.contains(event.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', onOutsideClick))
watch(() => route.fullPath, () => { open.value = false })

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
  (props.section.to && (props.section.to as { name?: string }).name === route.name) ||
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
