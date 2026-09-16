<template>
  <StickyHeader class-name="header-absolute" data-bs-theme="dark">
    <b-alert
      v-model="dismissibleAlert"
      closeClass="py-3"
      dismissible
      class="d-none d-sm-block py-2 m-0 bg-primary border-0 rounded-0 text-center overflow-hidden"
    >
      <p class="text-white small m-0">
        <font-awesome-icon :icon="faMessage" class="me-2" />GSA Multiple Award Schedule 47QTCA21D004X &middot; California CMAS &middot;
        <a :href="contact.phoneHref" class="text-white text-decoration-underline">{{ contact.phone }}</a>
      </p>
    </b-alert>

    <nav class="navbar navbar-expand-xl">
      <b-container>
        <LogoBox className="me-0" onlyLight />

        <AppMenu ulClass="mx-auto" showContactUs showDocs />

        <ul class="nav align-items-center dropdown-hover ms-sm-2">
          <!-- <ThemeToggleDropdown /> 

          <li class="nav-item me-2 d-none d-sm-block">
            <router-link :to="{ name: 'auth.sign-in' }" class="btn btn-sm btn-light mb-0"
              ><BIconPersonCircle class="me-1" />Sign in</router-link
            >
          </li-->

          <li class="nav-item">
            <router-link :to="{ name: 'contact' }" class="btn btn-sm btn-primary mb-0">
              Talk to an Expert
            </router-link>
          </li>

          <li class="nav-item">
            <MobileNavbarToggler />
          </li>
        </ul>
      </b-container>
    </nav>
  </StickyHeader>
</template>

<script lang="ts" setup>
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { BIconPersonCircle } from 'bootstrap-icons-vue'
import StickyHeader from '@/components/topbar/StickyHeader.vue'
import LogoBox from '@/components/topbar/LogoBox.vue'
import ThemeToggleDropdown from '@/components/topbar/ThemeToggleDropdown.vue'
import MobileNavbarToggler from '@/components/topbar/MobileNavbarToggler.vue'
import AppMenu from '@/components/topbar/LinkosysMenu/index.vue'
import { ref } from 'vue'
import { contact } from '@/content/company'

const dismissibleAlert = ref(true)
</script>
