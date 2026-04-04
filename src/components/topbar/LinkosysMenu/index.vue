<template>
  <b-collapse id="topbar-appmenu-collapse" class="navbar-collapse">
    <ul class="navbar-nav navbar-nav-scroll dropdown-hover" :class="ulClass">
      <ServicesMenuDropdown :menuItems="menuItems[0].children!" />
      <!-- <TechstackMenuDropdown :menu-items="menuItems[1].children!" /> -->
      <li v-if="showDocs" class="nav-item">
        <router-link
          class="nav-link"
          :to="{ name: 'projects' }"
        >
          Projects
        </router-link>
      </li>
      <ResourcesMenuDropdown v-if="showResources" />
      <CompanyMenuDropdown :menu-items="menuItems[2].children!" />
      <MegaMenu v-if="showMegaMenu" />
      
      <li v-if="showDocs" class="nav-item">
        <router-link
          class="nav-link"
          :to="{ name: 'contact' }"
        >
          Contact
        </router-link>
      </li>
    </ul>
  </b-collapse>
</template>

<script lang="ts" setup>
import { getAppMenuItems, type MenuItemType } from '@/helpers/linkosys-menu'
import ServicesMenuDropdown from './ServicesMenuDropdown.vue'
import TechstackMenuDropdown from './TechstackMenuDropdown.vue'
import MegaMenu from './MegaMenu.vue'
import CompanyMenuDropdown from './CompanyMenuDropdown.vue'
import ResourcesMenuDropdown from './ResourcesMenu.vue'

type AppMenuProps = {
  showMegaMenu?: boolean
  showResources?: boolean
  showContactUs?: boolean
  showDocs?: boolean
  ulClass?: string
}
const menuItems: MenuItemType[] = getAppMenuItems()

defineProps<AppMenuProps>()
</script>
