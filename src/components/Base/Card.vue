<script setup lang="ts">
// PROPS
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="max-w-md w-full rounded-lg shadow-lg bg-white">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-800 text-center">{{ title }}</h2>
      <slot name="card_content" />
    </div>
  </div>
</template>
