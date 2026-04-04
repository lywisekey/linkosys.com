<template>
  <section class="pt-0 bg-dark">
    <b-container>
      <div class="position-relative overflow-hidden p-5 p-md-7" data-bs-theme="dark">
        <b-row class="position-relative">
          <b-col lg="5" class="order-1">
            <h3 class="text-primary">Let’s Get to Work</h3>
            <p>Drop us a message, and we'll get back to you within three business days.</p>

            <div
              class="mt-5 border border-white border-opacity-50 rounded-circle d-flex align-items-center justify-content-center flex-column h-200px w-200px"
            >
              <div class="d-flex">
                <h4 class="purecounter text-white mb-0">
                  <Vue3Autocounter ref="counter" :startAmount="0" :endAmount="100" :duration="3" />
                </h4>
                <span class="h4 text-primary mb-0">+</span>
              </div>
              <p class="text-center text-white mb-0">Projects done</p>
            </div>

            <div class="d-flex justify-content-end mt-n6 mt-lg-0 mt-xl-n7 me-n3">
              <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center flex-column h-150px w-150px">
                <h4 class="purecounter mb-0">
                  <Vue3Autocounter :startAmount="0" :endAmount="yearsExperience" :duration="3" />
                </h4>
                <p class="text-center heading-color mb-0">Years in <br />business</p>
              </div>
            </div>
          </b-col>

          <b-col lg="6" class="ms-auto mb-6 mb-lg-0 order-lg-2">
            <form v-if="!sent" @submit.prevent="handleSubmit" class="row g-4">
              <b-col md="6">
                <b-form-group label="Your name *" label-class="heading-color">
                  <b-form-input v-model="form.name" size="lg" placeholder="Full name" required />
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group label="Email address *" label-class="heading-color">
                  <b-form-input v-model="form.email" type="email" size="lg" placeholder="name@example.com" required />
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group label="Phone number *" label-class="heading-color">
                  <b-form-input v-model="form.phone" size="lg" placeholder="+x xxx xxx xxxx" required />
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group label="Company *" label-class="heading-color">
                  <b-form-input v-model="form.company" size="lg" placeholder="Company name" required />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Tell us about your project *" label-class="heading-color">
                  <b-form-textarea v-model="form.message" style="height: 150px" required />
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group :label="`What is ${captcha.a} + ${captcha.b}? *`" label-class="heading-color">
                  <b-form-input v-model="form.captchaAnswer" size="lg" placeholder="Enter result" required />
                </b-form-group>
              </b-col>

              <b-col cols="12" class="d-grid">
                <b-button
                  variant="primary"
                  size="lg"
                  type="submit"
                  :disabled="loading || sent"
                >
                  <b-spinner v-if="loading" small class="me-2" />
                  {{ sent ? 'Sent' : 'Send a message' }}
                </b-button>
              </b-col>
            </form>
            <div v-else class="text-center text-white py-5">
              <h4 class="mb-3">Thank you!</h4>
              <p>Your message has been successfully sent. We’ll get back to you soon.</p>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>

    <!-- Toast Notification -->
    <transition name="fade">
      <div
        v-if="toast.show"
        :class="['toast-custom', toast.type === 'success' ? 'bg-success' : 'bg-danger']"
      >
        {{ toast.message }}
      </div>
    </transition>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import Vue3Autocounter from 'vue3-autocounter'

const yearsExperience = computed(() => new Date().getFullYear() - 2016)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  captchaAnswer: ''
})

const captcha = reactive({ a: 0, b: 0 })
const loading = ref(false)
const sent = ref(false)

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 5000)
}

const generateCaptcha = () => {
  captcha.a = Math.floor(Math.random() * 10)
  captcha.b = Math.floor(Math.random() * 10)
}

onMounted(generateCaptcha)

const handleSubmit = async () => {
  const result = parseInt(form.captchaAnswer)
  if (result !== captcha.a + captcha.b) {
    showToast('Captcha answer is incorrect. Please try again.', 'danger')
    generateCaptcha()
    form.captchaAnswer = ''
    return
  }

  loading.value = true

  try {
    const postData = {
      ...form,
      captcha_expected: captcha.a + captcha.b
    }

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })

    const data = await response.json()

    if (data.success) {
      showToast(data.message || 'Your message has been sent successfully.', 'success')
      sent.value = true
      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        captchaAnswer: ''
      })
      generateCaptcha()
    } else {
      const msg = Array.isArray(data.errors)
        ? data.errors.join(', ')
        : data.message || 'The system is currently busy. Please try again later or contact us directly.'
      showToast(msg, 'danger')
    }
  } catch (error) {
    showToast('The system is currently busy. Please try again later or contact us via email or phone.', 'danger')
  }

  loading.value = false
}
</script>

<style scoped>
.toast-custom {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 14px 20px;
  color: #fff;
  border-radius: 4px;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  max-width: 90%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.bg-success {
  background-color: #28a745 !important;
}
.bg-danger {
  background-color: #dc3545 !important;
}
</style>