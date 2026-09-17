<template>
  <footer class="lk-darkest position-relative overflow-hidden pt-6" data-bs-theme="dark">
    <b-container class="position-relative mt-5">
      <b-row class="g-4">
        <b-col xl="3" class="mb-4 mb-xl-0">
          <LogoBox imageClass="h-40px" />
          <p class="small mt-3 mb-2" style="color: var(--lk-ink-invert-muted); max-width: 30ch">
            Linkosys Inc. — U.S. technology consulting and engineering for government and
            enterprise organizations.
          </p>
          <p class="small mb-0" style="color: var(--lk-ink-invert-muted)">
            GSA MAS 47QTCA21D004X<br />California CMAS
          </p>
        </b-col>

        <b-col cols="12" md="4" lg="5" xl="3">
          <h6 class="mb-2 mb-md-4">Find Services</h6>
          <b-row class="g-0">
            <b-col lg="12">
              <ul class="nav flex-column">
                <li class="nav-item" v-for="(item, idx) in footerServices3" :key="idx">
                  <router-link class="nav-link" :class="!idx && 'pt-0'" :to="item.to"
                    >{{ item.name }}</router-link
                  >
                </li>
              </ul>
            </b-col>
            
          </b-row>
        </b-col>

        <b-col cols="12" md="4" lg="3" xl="3">
          <h6 class="mb-2 mb-md-4">Quick links</h6>
          <ul class="nav flex-column">
            <li class="nav-item" v-for="(item, idx) in quickLinks" :key="idx">
              <router-link class="nav-link" :class="!idx && 'pt-0'" :to="item.to"
                >{{ item.name }}</router-link
              >
            </li>
          </ul>
        </b-col>

        <b-col sm="6" md="4" lg="4" xl="3">
          <h6 class="mb-2 mb-md-4">Explore</h6>
          <ul class="nav flex-column">
            <li class="nav-item" v-for="(item, idx) in communityLinks" :key="idx">
              <router-link class="nav-link" :class="!idx && 'pt-0'" :to="item.to">{{
                item.name
              }}</router-link>
            </li>
          </ul>
        </b-col>
      </b-row>

      <hr class="opacity-1 my-5 my-sm-6" />

      <b-row class="g-4 align-items-center">
        <b-col xl="3" class="text-lg-center text-xl-start mb-4 mb-xl-0">
          <h5 class="mb-1">Get in touch</h5>
          <p class="mb-0">Head office, California</p>
        </b-col>

        <b-col sm="6" md="4" xl="3" class="d-flex justify-content-md-center">
          <div class="position-relative d-flex align-items-center">
            <div class="icon-lg bg-body rounded-circle flex-shrink-0 flex-centered">
              <BIconTelephone class="heading-color" :role="null" aria-hidden="true" />
            </div>
            <div class="nav flex-column ps-3">
              <div class="small text-body-secondary">Give us a call</div>
              <p class="fw-semibold mt-1 mb-0">
                <a 
                :href="'tel:' + contactDetails.number"
                class="heading-color text-primary-hover stretched-link p-0">{{
                  contactDetails.number
                }}</a>
              </p>
            </div>
          </div>
        </b-col>

        <b-col sm="6" md="4" xl="3" class="d-flex justify-content-md-center">
          <div class="position-relative d-flex align-items-center">
            <div class="icon-lg bg-body rounded-circle flex-shrink-0 flex-centered">
              <BIconEnvelope class="heading-color" :role="null" aria-hidden="true" />
            </div>
            <div class="nav flex-column ps-3">
              <div class="small text-body-secondary">Send us an email</div>
              <p class="fw-semibold mt-1 mb-0">
                <a 
                :href="'mailto:' + contactDetails.email"
                class="heading-color text-primary-hover stretched-link p-0">{{
                  contactDetails.email
                }}</a>
              </p>
            </div>
          </div>
        </b-col>

        <b-col sm="6" md="4" xl="3" class="d-flex justify-content-md-center">
          <div class="position-relative d-flex align-items-center">
            <div class="icon-lg bg-body rounded-circle flex-shrink-0 flex-centered">
              <BIconGeoAlt class="heading-color" :role="null" aria-hidden="true" />
            </div>
            <div class="nav flex-column ps-3">
              <div class="small text-body-secondary">Visit us at</div>
              <p class="fw-semibold heading-color mt-1 mb-0">{{ contactDetails.address }}</p>
            </div>
          </div>
        </b-col>
      </b-row>

      <hr class="opacity-1 mt-6 mb-0" />

      <div
        class="d-md-flex justify-content-between align-items-center text-center text-lg-start py-4"
      >
        <div class="text-body mb-3 mb-md-0">
          Copyright © {{ currentYear }} Linkosys. All Rights Reserved.
        </div>

        <!-- <ul class="list-inline mb-0 icons-center justify-content-center gap-1">
          <li class="list-inline-item" v-for="(item, idx) in followOnIcons" :key="idx">
            <router-link class="btn btn-xs btn-icon btn-light" to="">
              <font-awesome-icon :icon="item.icon" class="fa-fw lh-base"
            /></router-link>
          </li>
        </ul> -->
      </div>
    </b-container>
  </footer>
</template>

<script lang="ts" setup>
import LogoBox from '@/components/topbar/LogoBox.vue'
import {
  footerServices3,
  quickLinks,
  communityLinks,
  contactDetails,
  followOnIcons
} from '@/assets/data/linkosys-footer-items'
import { BIconEnvelope, BIconGeoAlt, BIconTelephone } from 'bootstrap-icons-vue'
import { currentYear, developedBy, developedByLink } from '@/helpers'

</script>
