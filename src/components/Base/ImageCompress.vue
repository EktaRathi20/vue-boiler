<script setup lang="ts">
// IMPORTS
import { ref } from 'vue'
import imageCompression from 'browser-image-compression'

// DATA
const compressedImage = ref<string | null>(null)

// METHODS
const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    try {
      console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`)

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, options)
      console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`)

      compressedImage.value = URL.createObjectURL(compressedFile)
    } catch (error) {
      console.error('Error during image compression:', error)
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center border border-gray-300 p-4 w-fit">
    <input
      type="file"
      @change="handleFileUpload"
      class="block w-full max-w-xs text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
    />
    <div v-if="compressedImage" class="mt-4 text-center flex align-center gap-4">
      <h3 class="text-lg font-semibold mb-2">{{ $t('common.compressedImage') }}:</h3>
      <img :src="compressedImage" alt="Compressed Image" width="100" height="100" />
    </div>
  </div>
</template>

<style scoped></style>
