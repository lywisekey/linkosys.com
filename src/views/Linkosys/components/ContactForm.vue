<template>
  <section class="pt-0 bg-dark">
    <b-container>
      <div class="position-relative overflow-hidden p-3 p-sm-5 p-md-7" data-bs-theme="dark">
        <b-row class="position-relative">
          <b-col lg="5" class="order-1">
            <p class="lk-eyebrow">Send an enquiry</p>
            <h2 class="lk-display h2 mb-3 text-white">What to include</h2>
            <p class="mb-4" style="color: var(--lk-ink-invert-muted)">
              The more specific the message, the more useful the first reply. These are the details
              that let us answer properly instead of asking four follow-up questions.
            </p>

            <ul class="list-unstyled mb-0">
              <li v-for="hint in hints" :key="hint" class="py-3 d-flex gap-3" style="border-top: 1px solid var(--lk-line-dark)">
                <span aria-hidden="true" style="color: var(--lk-accent)">&#8212;</span>
                <span style="color: var(--lk-ink-invert-muted)">{{ hint }}</span>
              </li>
            </ul>

            <div class="d-flex mt-5">
              <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center flex-column h-150px w-150px">
                <p class="purecounter h4 mb-0" aria-hidden="true">
                  <Vue3Autocounter :startAmount="0" :endAmount="yearsExperience" :duration="3" />
                </p>
                <p class="text-center heading-color mb-0">
                  <span class="visually-hidden">{{ yearsExperience }} </span>Years in <br />business
                </p>
              </div>
            </div>
          </b-col>

          <b-col lg="6" class="ms-auto mb-6 mb-lg-0 order-lg-2">
            <form v-if="!sent" @submit.prevent="handleSubmit" :aria-busy="loading" class="row g-4">
              <b-col md="6">
                <b-form-group label="Your name *" label-for="lk-name" label-class="heading-color">
                  <b-form-input id="lk-name" v-model="form.name" autocomplete="name" :maxlength="120" size="lg" placeholder="Full name" required />
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group label="Work email *" label-for="lk-email" label-class="heading-color">
                  <b-form-input id="lk-email" v-model="form.email" :maxlength="200" type="email" size="lg" autocomplete="email" placeholder="name@company.com" required />
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group label="Phone number" label-for="lk-phone" label-class="heading-color">
                  <b-form-input id="lk-phone" v-model="form.phone" :maxlength="40" type="tel" size="lg" autocomplete="tel" placeholder="Optional" />
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group label="Company / agency *" label-for="lk-company" label-class="heading-color">
                  <b-form-input id="lk-company" v-model="form.company" :maxlength="160" size="lg" autocomplete="organization" placeholder="Organization name" required />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Area of interest *" label-for="lk-interest" label-class="heading-color">
                  <b-form-select id="lk-interest" v-model="form.interest" size="lg" :options="interestOptions" required />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Project or requirement *" label-for="lk-message" label-class="heading-color">
                  <b-form-textarea
                    id="lk-message" v-model="form.message" :maxlength="5000"
                    style="height: 150px"
                    placeholder="What are you trying to achieve, and what is in the way?"
                    required
                  />
                </b-form-group>
              </b-col>

              <b-col md="12">
                <b-form-group :label="`What is ${captcha.a} + ${captcha.b}? *`" label-for="lk-captcha" label-class="heading-color">
                  <b-form-input id="lk-captcha" v-model="form.captchaAnswer" inputmode="numeric" pattern="[0-9]+" size="lg" placeholder="Enter result" required />
                </b-form-group>
              </b-col>

              <!-- Honeypot: hidden from users, attractive to bots. -->
              <div class="d-none" aria-hidden="true">
                <label for="lk-website">Website</label>
                <input id="lk-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
              </div>

              <b-col v-if="toast.show" cols="12">
                <p role="status" aria-live="polite" class="mb-0 p-3 rounded text-white"
                  :class="toast.type === 'success' ? 'bg-success' : 'bg-danger'">{{ toast.message }}</p>
              </b-col>

              <b-col cols="12">
                <p class="small mb-0" style="color: var(--lk-ink-invert-muted)">
                  We use your details to respond to your enquiry. Read our
                  <router-link :to="{ name: 'privacy' }" class="text-white text-decoration-underline">Privacy Policy</router-link>.
                </p>
              </b-col>

              <b-col cols="12" class="d-grid">
                <b-button
                  variant="primary"
                  size="lg"
                  type="submit"
                  :disabled="loading || sent"
                >
                  <b-spinner v-if="loading" small class="me-2" />
                  {{ loading ? 'Sending…' : 'Send a message' }}
                </b-button>
              </b-col>
            </form>
            <div v-else role="status" aria-live="polite" class="text-center text-white py-5">
              <h4 class="mb-3">Thank you!</h4>
              <p>Your message has been successfully sent. We’ll get back to you soon.</p>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import Vue3Autocounter from 'vue3-autocounter'
const hints = [
  'The system or process involved, and what it runs on today',
  'What is actually constraining you — time, cost, risk or capability',
  'Whether this is a contract vehicle, a solicitation or a direct engagement',
  'Your timeline, and any fixed date you are working to'
]

const yearsExperience = computed(() => new Date().getFullYear() - 2016)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  interest: '',
  website: '',
  captchaAnswer: ''
})

const interestOptions = [
  { value: '', text: 'Select an area', disabled: true },
  'Software Development',
  'AI & Data',
  'Cloud & Infrastructure',
  'Cybersecurity',
  'IT Staffing',
  'Project & Program Management',
  'Government / Contract Vehicles',
  'Manufacturing / MES',
  'Other'
]

const captcha = reactive({ a: 0, b: 0 })
const loading = ref(false)
const sent = ref(false)

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message: string, type: 'success' | 'danger' = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true
}

const generateCaptcha = () => {
  captcha.a = Math.floor(Math.random() * 10)
  captcha.b = Math.floor(Math.random() * 10)
}

onMounted(generateCaptcha)

const handleSubmit = async () => {
  if (loading.value) return
  const result = Number(form.captchaAnswer)
  if (result !== captcha.a + captcha.b) {
    showToast('Captcha answer is incorrect. Please try again.', 'danger')
    generateCaptcha()
    form.captchaAnswer = ''
    return
  }

  loading.value = true

  try {
    const postData = {
      name: form.name, email: form.email, phone: form.phone,
      company: form.company, interest: form.interest,
      message: form.message, website: form.website
    }

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })

    const data = await response.json()

    if (response.ok && data.success) {
      showToast(data.message || 'Your message has been sent successfully.', 'success')
      sent.value = true
      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        interest: '',
        website: '',
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
