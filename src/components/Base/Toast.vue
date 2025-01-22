<script setup lang="ts">
// IMPORTS
import { computed, watchEffect } from 'vue'
import { useToastStore } from '@/stores'

// STORE
const toastStore = useToastStore()

// DATA
const toasterClasses: Record<string, any> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
  warn: 'bg-yellow-500 text-white',
}

// COMPUTED
const toasterClass = computed(
  () => toasterClasses[toastStore.config.severity] || toasterClasses.info,
)

// WATCH
watchEffect(() => {
  if (toastStore.isVisible) {
    setTimeout(() => {
      toastStore.hideToast()
    }, 3000)
  }
})
</script>

<template>
  <div v-if="toastStore.isVisible" class="fixed top-4 right-4 z-50 max-w-xs w-full">
    <div :class="['p-4 rounded-lg shadow-md', toasterClass]" role="alert">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row justify-between">
          <span class="font-semibold text-lg">{{ toastStore.config.summary }}</span>
          <button class="text-white hover:text-gray-200 ml-auto" @click="toastStore.hideToast()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <span class="text-sm text-opacity-80">{{ toastStore.config.detail }}</span>
      </div>
    </div>
  </div>
</template>
