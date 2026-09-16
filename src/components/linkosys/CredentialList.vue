<template>
  <div>
    <dl class="mb-0">
      <div v-for="item in visibleItems" :key="item.label" class="lk-fact">
        <dt>{{ item.label }}</dt>
        <dd class="d-flex flex-wrap align-items-center gap-2">
          <span :class="{ 'opacity-75 fw-normal fst-italic': item.verify }">{{ item.value }}</span>
          <VerifyTag v-if="item.verify" />
        </dd>
        <p v-if="item.detail" class="small mb-0 mt-1 text-muted-adaptive" style="color: var(--lk-ink-muted)">
          {{ item.detail }}
        </p>
      </div>
    </dl>

    <!-- Build-time reminder for the team. Never rendered in a production build. -->
    <p v-if="isDev && pendingCount" class="small mt-4 mb-0 lk-verify">
      Dev only — {{ pendingCount }} unconfirmed credential{{ pendingCount === 1 ? '' : 's' }} hidden
      from visitors. See docs/CONTENT-VERIFICATION.md
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Credential } from '@/content/types'
import VerifyTag from './VerifyTag.vue'

const props = defineProps<{ items: Credential[] }>()

const isDev = import.meta.env.DEV

/**
 * Unconfirmed credentials are shown while developing and withheld from visitors.
 *
 * An earlier version published rows reading "UEI to confirm" and "CAGE code to
 * confirm" on the Government page. A contracting officer reads that as a company
 * that is not registered in SAM.gov — worse than an absent row. The gap is
 * tracked in docs/CONTENT-VERIFICATION.md, which is where a TODO belongs.
 */
const visibleItems = computed(() =>
  isDev ? props.items : props.items.filter((item) => !item.verify)
)

const pendingCount = computed(() => props.items.filter((item) => item.verify).length)
</script>
