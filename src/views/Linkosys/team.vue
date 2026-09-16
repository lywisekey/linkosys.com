<template>
  <DefaultLayout>
    <PageHero
      art="signal"
      eyebrow="Leadership &amp; team"
      title="The people who deliver the work"
      lead="Engagements are run by the same people who scope them. These are the leaders and senior engineers clients work with directly."
      :crumbs="[{ label: 'Leadership & Team' }]"
    >
      <template #actions>
        <router-link :to="{ name: 'contact' }" class="btn btn-primary mb-0">Talk to an Expert</router-link>
      </template>
    </PageHero>

    <section class="lk-section">
      <b-container>
        <b-row class="g-5">
          <b-col v-for="member in team" :key="member.username" md="6" xl="4">
            <article class="h-100">
              <TeamAvatar
                class="mb-3"
                :name="member.username"
                :role="member.role"
                :photo="member.photo"
              />
              <h2 class="h5 mb-1">{{ member.username }}</h2>
              <p class="lk-eyebrow mb-3" style="margin-top: 0">{{ member.role }}</p>
              <!-- Bios already existed in the content data; the previous page showed
                   only name and title and discarded them. -->
              <p class="mb-0" style="color: var(--lk-ink-muted); font-size: 0.9375rem; line-height: 1.6">
                {{ member.experience }}
              </p>
            </article>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <CtaBand
      title="Work with this team"
      body="Engagements are staffed by named people, not an anonymous bench. Tell us the problem and we will tell you who would run it."
      action="Talk to an Expert"
      secondary-label="See Delivered Work"
      :secondary-to="{ name: 'case-studies' }"
    />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import CtaBand from '@/components/linkosys/CtaBand.vue'
import TeamAvatar from '@/components/linkosys/TeamAvatar.vue'
import { team } from '@/views/Linkosys/data/team-data'
</script>
