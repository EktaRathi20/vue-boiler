<script setup lang="ts">
// IMPORTS
import { onMounted, ref } from 'vue'
import Quill from 'quill'

// DATA
const editor = ref<HTMLElement | null>(null)

// HOOKS
onMounted(() => {
  if (editor.value) {
    new Quill(editor.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link'],
        ],
      },
    })
  }
})
</script>

<template>
  <div ref="editor" class="quill-editor"></div>
</template>

<style scoped>
.quill-editor {
  height: 300px;
}
</style>
