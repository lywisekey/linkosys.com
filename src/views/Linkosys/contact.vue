<template>
  <DefaultLayout>
    <PageHero
      art="signal"
      eyebrow="Contact"
      title="Talk to an expert"
      lead="Tell us the problem and the constraint. We will tell you how we would approach it, who would run it, and whether we are the right fit."
      :crumbs="[{ label: 'Contact' }]"
    >
      <template #aside>
        <div class="lk-hero-panel">
          <p class="lk-eyebrow mb-3">Direct contact</p>
          <dl class="mb-0">
            <div class="lk-fact pt-0">
              <dt>Phone</dt>
              <dd>
                <a :href="contact.phoneHref" class="text-white text-decoration-none">
                  {{ contact.phone }}
                </a>
              </dd>
            </div>
            <div class="lk-fact">
              <dt>Email</dt>
              <dd>
                <a :href="contact.emailHref" class="text-white text-decoration-none">
                  {{ contact.email }}
                </a>
              </dd>
            </div>
            <div class="lk-fact">
              <dt>Office</dt>
              <dd style="font-size: 0.9375rem; font-weight: 500">{{ contact.address }}</dd>
            </div>
          </dl>
        </div>
      </template>
    </PageHero>

    <!-- What happens next ------------------------------------------------------>
    <section class="lk-section-tight border-bottom">
      <b-container>
        <b-row class="g-4">
          <b-col v-for="(step, index) in nextSteps" :key="step.title" md="4">
            <p class="h5 mb-2" style="color: var(--lk-accent-text); font-variant-numeric: tabular-nums">
              {{ String(index + 1).padStart(2, '0') }}
            </p>
            <h2 class="h6 mb-2">{{ step.title }}</h2>
            <p class="mb-0" style="color: var(--lk-ink-muted); font-size: 0.9375rem">
              {{ step.description }}
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <ContactForm />

    <!-- Routing help ----------------------------------------------------------->
    <section class="lk-section">
      <b-container>
        <SectionHeader
          eyebrow="Not sure where to start"
          title="Common reasons people get in touch"
        />
        <b-row class="g-4">
          <b-col v-for="route in enquiryRoutes" :key="route.label" md="6" xl="3">
            <router-link :to="route.to" class="lk-card h-100 text-decoration-none">
              <h3 class="h6 heading-color">{{ route.label }}</h3>
              <p class="mb-0">{{ route.description }}</p>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import SectionHeader from '@/components/linkosys/SectionHeader.vue'
import ContactForm from './components/ContactForm.vue'
import { contact } from '@/content/company'

const nextSteps = [
  {
    title: 'Reviewed by our team',
    description:
      'Enquiries go to the team who would do the work, not to a general marketing inbox.'
  },
  {
    title: 'A direct answer',
    description:
      'We reply within three business days with an initial view, including when we are not the right fit.'
  },
  {
    title: 'A working conversation',
    description:
      'If it looks like a fit, the next call is with the people who would actually run the engagement.'
  }
]

const enquiryRoutes = [
  {
    label: 'A government requirement',
    description: 'Solicitations, task orders, contract vehicles and teaming.',
    to: { name: 'government' }
  },
  {
    label: 'A system to build or modernize',
    description: 'New applications, or replacing something that has become risky to change.',
    to: { name: 'services.detail', params: { slug: 'software-development' } }
  },
  {
    label: 'Technology talent',
    description: 'Contract, contract-to-hire and direct placement for technical roles.',
    to: { name: 'services.detail', params: { slug: 'it-staffing' } }
  },
  {
    label: 'A manufacturing problem',
    description: 'MES, production visibility and connecting plant systems to the rest of the business.',
    to: { name: 'industry.detail', params: { slug: 'manufacturing' } }
  }
]
</script>
