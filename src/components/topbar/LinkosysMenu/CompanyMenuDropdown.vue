<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle arrow-none d-flex justify-content-between align-items-center w-100"
      href="#"
      :class="menuItemActive('pages', currentRouteName) && 'active'"
    >
      Company
      <font-awesome-icon :icon="faAngleDown" class="fa-sm ms-1" />
    </a>
    <div class="dropdown-menu">
      <template v-for="(item, idx) in menuItems" :key="item.key + idx">
        <MenuItemWithChildren v-if="item.children" :item="item" />
        <MenuItem v-else :item="item" />
      </template>
    </div>
  </li>
</template>

<script lang="ts" setup>
import router from '@/router'
import type { MenuItemType } from '@/helpers/menu'
import MenuItem from '@/components/topbar/AppMenu/MainMenuItem.vue'

import { menuItemActive } from '@/components/topbar/AppMenu/getActiveClass'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

type PortfolioMenuDropdownProps = {
  menuItems: MenuItemType[]
}

defineProps<PortfolioMenuDropdownProps>()

const currentRouteName = router.currentRoute.value.name
</script>
