<script setup lang="ts">
import { computed } from 'vue'
import { ICONS } from './Icons'

// PROPS
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

// COMPUTED
const iconComponent = computed(() => ICONS[props.name])
</script>

<template>
  <component :is="iconComponent" />
</template>
