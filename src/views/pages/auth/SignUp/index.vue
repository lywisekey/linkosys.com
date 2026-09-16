<template>
  <AuthLayuot>
    <b-col sm="10" lg="5" class="d-flex m-auto vh-100">
      <b-row class="w-100 m-auto">
        <b-col lg="10" class="my-5 m-auto">
          <LogoBox smallLogo />
          
          <p class="mb-0">Let's get started with your 30 days free trial</p>

          <b-row class="mt-5">
            <b-col xxl="6" class="d-grid">
              <a href="#" class="btn border bg-light mb-2 mb-xxl-0 flex-centered">
                <VIcon
                  name="fc-google"
                  scale="1"
                  class="text-google-icon me-2"
                  height="18"
                  width="18"
                />Signup with Google</a
              >
            </b-col>
            <b-col xxl="6" class="d-grid">
              <a href="#" class="btn border bg-light mb-0"
                ><font-awesome-icon
                  :icon="faFacebookF"
                  class="fab fa-fw text-facebook me-2"
                />Signup with Facebook</a
              >
            </b-col>
            <div class="position-relative my-5">
              <hr />
              <p class="small position-absolute top-50 start-50 translate-middle bg-body px-4">
                Or
              </p>
            </div>
          </b-row>

          <b-form>
            <div class="input-floating-label form-floating mb-4">
              <b-form-input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>

            <PasswordInput name="password" v-model="newPassword" class="mb-4" />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              v-model="confirmPassword"
              class="mb-4"
            />

            <div class="mb-4">
              <b-form-checkbox
                >I agree to all Terms & conditions and the privacy policy.</b-form-checkbox
              >
            </div>
            <div class="align-items-center mt-0">
              <div class="d-grid">
                <b-button variant="dark" class="mb-0" type="button">Create an account</b-button>
              </div>
            </div>
          </b-form>

          <div class="mt-4 text-center">
            <span
              >Already have an account?<router-link :to="{ name: 'auth.sign-in' }">
                Sign in here</router-link
              ></span
            >
          </div>
        </b-col>
      </b-row>
    </b-col>
  </AuthLayuot>
</template>

<script lang="ts" setup>
import { OhVueIcon as VIcon, addIcons } from 'oh-vue-icons'
import { FcGoogle } from 'oh-vue-icons/icons'
addIcons(FcGoogle)

import { ref } from 'vue'
import AuthLayuot from '@/layouts/AuthLayuot.vue'
import LogoBox from '@/components/topbar/LogoBox.vue'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import PasswordInput from '@/components/PasswordInput.vue'

let newPassword = ref<string>('')
const confirmPassword = ref('')
</script>
