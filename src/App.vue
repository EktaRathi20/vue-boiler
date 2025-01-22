<script setup lang="ts">
// IMPORTS
import Loader from './components/Base/Loader.vue'
import Toast from './components/Base/Toast.vue'
</script>

<template>
  <div>
    <Toast />
    <Loader />
    <router-view />
  </div>
</template>
