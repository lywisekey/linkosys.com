<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle arrow-none d-flex justify-content-between align-items-center w-100"
      href="#"
      :class="menuItemActive('pages', currentRouteName) && 'active'"
    >
      Tech Stack
      <font-awesome-icon :icon="faAngleDown" class="fa-sm ms-1" />
    </a>
    <div class="dropdown-menu">
      <template v-for="(item, idx) in menuItems" :key="item.key + idx">
        <MenuItemWithChildren v-if="item.children" :item="item" />
        <MenuItem v-else :item="item" />
      </template>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li>
        <a class="dropdown-item" :href="supportLink">
          <BIconLifePreserver class="me-2" />
          Support
        </a>
      </li>
      
    </div>
  </li>
</template>

<script lang="ts" setup>
import router from '@/router'
import { supportLink } from '@/helpers'
import type { MenuItemType } from '@/helpers/menu'
import MenuItem from '@/components/topbar/AppMenu/MainMenuItem.vue'
import MenuItemWithChildren from '@/components/topbar/AppMenu/MenuItemWithChildren.vue'
import { menuItemActive } from '@/components/topbar/AppMenu/getActiveClass'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { BIconLifePreserver } from 'bootstrap-icons-vue'

type TechstackMenuDropdownProps = {
  menuItems: MenuItemType[]
}

defineProps<TechstackMenuDropdownProps>()

const currentRouteName = router.currentRoute.value.name
</script>
