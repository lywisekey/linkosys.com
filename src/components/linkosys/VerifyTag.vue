<template>
  <!-- Deliberately conspicuous: unconfirmed copy must not read as fact. -->
  <span class="lk-verify" :title="title">{{ label }}</span>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{ label?: string; title?: string }>(),
  {
    label: 'Verify',
    title: 'This value needs confirmation from Linkosys before publication.'
  }
)
</script>
