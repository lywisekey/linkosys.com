<template>
  <section class="py-6 py-md-8">
    <b-container>
      <div class="inner-container-small text-center mb-4 mb-md-6">
        <h2 class="mb-3 mt-2">{{ title }}</h2>
        <p v-if="description" class="text-muted">{{ description }}</p>
      </div>

      <div class="inner-container center">
        <b-row
          class="g-3 g-md-4 justify-content-center"
        >
          <b-col
            v-for="(item, idx) in technologies"
            :key="idx"
            cols="6"
            md="4"
            lg="3"
            class="text-center"
          >
            <div class="bg-light rounded-pill d-flex align-items-center justify-content-center px-3 py-2">
              <img
                :src="resolveImage(item.icon)"
                :alt="item.label"
                class="me-2"
                style="height: 24px;"
              />
              <span class="fw-semibold">{{ item.label }}</span>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script setup lang="ts">
const { title, description, technologies } = defineProps<{
  title: string
  description?: string
  technologies: { icon: string; label: string }[]
}>()

const modules = import.meta.glob('/src/assets/images/**', {
  eager: true,
  import: 'default'
})

const resolveImage = (file: string) => {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${file}`)
  )
  if (entry) return entry[1] as string
  console.warn('Không tìm thấy ảnh:', file)
  return ''
}
</script>