<template>
  <section class="py-5">
    <b-container>
      <b-row
        class="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-4 justify-content-center"
      >
        <b-col v-for="(item, idx) in team" :key="idx">
          <b-card
            no-body
            class="card-hover-shadow bg-transparent text-center p-4"
            @click="openModal(item)"
            style="cursor: pointer"
          >
            <div class="w-50 mx-auto flex-shrink-0 mb-3">
              <img class="rounded-circle" :src="item.avatar" :alt="item.username" />
            </div>
            <h6 class="mb-1">{{ item.username }}</h6>
            <small>{{ item.role }}</small>
          </b-card>
        </b-col>
      </b-row>

      <b-modal
        v-model="modalVisible"
        :title="selectedMember?.username || 'Member'"
        centered
        hide-footer
        fade
      >
        <div class="text-left">
            {{ selectedMember?.role || '' }}
        </div>

        <div v-if="selectedMember" class="text-center">
          <div class="w-50 mx-auto mb-3">
            <img
              class="avatar-img rounded-circle"
              :src="selectedMember.avatar || '/placeholder.jpg'"
              :alt="selectedMember.username || 'Member avatar'"
            />
          </div>
          <p class="text-muted">
            {{ selectedMember.experience || 'No description available.' }}
          </p>

          <div class="d-flex justify-content-center gap-2 mt-3">
            <a
              v-if="selectedMember.facebook"
              :href="selectedMember.facebook"
              target="_blank"
              class="btn btn-sm btn-primary"
              aria-label="Facebook profile"
            >
              Facebook
            </a>
            <a
              v-if="selectedMember.twitter"
              :href="selectedMember.twitter"
              target="_blank"
              class="btn btn-sm btn-info"
              aria-label="Twitter profile"
            >
              Twitter
            </a>
            <a
              v-if="selectedMember.instagram"
              :href="selectedMember.instagram"
              target="_blank"
              class="btn btn-sm btn-danger"
              aria-label="Instagram profile"
            >
              Instagram
            </a>
          </div>
        </div>
      </b-modal>
    </b-container>
  </section>
</template>

<script setup lang="ts">
interface TeamMember {
  username?: string
  role?: string
  avatar?: string
  experience?: string
  facebook?: string
  twitter?: string
  instagram?: string
}
import { ref } from 'vue'
import { team } from '@/views/Linkosys/data/team-data'

const modalVisible = ref(false)
const selectedMember = ref<TeamMember | null>(null)

function openModal(member: TeamMember) {
  selectedMember.value = member
  modalVisible.value = true
}
</script>