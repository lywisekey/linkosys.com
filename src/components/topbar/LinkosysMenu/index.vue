<template>
  <b-collapse id="topbar-appmenu-collapse" class="navbar-collapse">
    <ul class="navbar-nav navbar-nav-scroll dropdown-hover" :class="ulClass">
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
import NavDropdown from './NavDropdown.vue'
import { navSections, primaryLinks } from './menu'

defineProps<{ ulClass?: string }>()
</script>
