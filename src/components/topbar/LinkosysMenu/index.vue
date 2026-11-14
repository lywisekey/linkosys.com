<template>
  <b-collapse v-model="expanded" id="topbar-appmenu-collapse" class="navbar-collapse">
    <ul class="navbar-nav navbar-nav-scroll dropdown-hover lk-primary-nav" :class="ulClass">
      <NavDropdown v-for="section in navSections" :key="section.label" :section="section" />

      <li v-for="link in primaryLinks" :key="link.label" class="nav-item">
        <router-link class="nav-link" :to="link.to" active-class="active">
          {{ link.label }}
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'contact' }" active-class="active">
          Contact
        </router-link>
      </li>
    </ul>
  </b-collapse>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavDropdown from './NavDropdown.vue'
import { navSections, primaryLinks } from './menu'

defineProps<{ ulClass?: string }>()

const expanded = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { expanded.value = false })
</script>
