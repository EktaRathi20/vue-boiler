<script setup lang="ts">
// IMPORTS
import { computed } from 'vue'
import { severity } from '@/models'

// PROPS
const props = defineProps({
  label: {
    type: String,
    default: '',
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    default: severity.PRIMARY,
  },
  fileUpload: {
    type: Boolean,
    default: false,
  },
})

// EMITS
const emit = defineEmits(['click', 'upload'])

// METHODS
const onclick = () => {
  emit('click')
}

const handleFile = (file: File) => {
  emit('upload', file)
}

// COMPUTED
const buttonClass = computed(() => {
  const baseClass = 'px-4 py-2 text-sm font-semibold rounded-md flex items-center gap-2'
  const typeClasses: Record<string, string> = {
    [severity.PRIMARY]: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    [severity.SECONDARY]: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    [severity.SUCCESS]: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    [severity.DANGER]: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    [severity.WARNING]: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    [severity.INFO]: 'bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500',
    [severity.LIGHT]: 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-100',
    [severity.DARK]: 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-800',
    [severity.LINK]: 'text-blue-500 hover:underline focus:ring-blue-500 bg-transparent',
  }
  const disabledClass = 'disabled:opacity-50 disabled:cursor-not-allowed'

  return [baseClass, typeClasses[props.level] || typeClasses.primary, disabledClass].join(' ')
})
</script>

<template>
  <button :class="buttonClass" :disabled="loading || disabled" @click="onclick()">
    <slot name="icon" />
    <!-- file upload-->
    <div v-file-upload="handleFile" v-if="fileUpload">
      <span v-if="label" class="p-button-label">
        {{ label }}
      </span>
    </div>
    <div v-else>
      <span v-if="label" class="p-button-label">
        {{ label }}
      </span>
    </div>
  </button>
</template>
