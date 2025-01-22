<script setup lang="ts">
// IMPORTS
import { useRouter } from 'vue-router'
import Button from '@/components/Base/Button.vue'
import { removeItem } from '@/utils'
import { severity } from '@/models'

// COMPOSABLES
const router = useRouter()

// METHODS
const logout = () => {
  removeItem('user')
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="dashboard">
    <div class="flex justify-between items-center mb-4">
      <p>Welcome to your dashboard!</p>
      <Button @click="logout" :level="severity.DANGER" label="Logout" />
    </div>
    <div class="stats">
      <div class="stat">
        <h2>Stat 1</h2>
        <p>Details about stat 1</p>
      </div>
      <div class="stat">
        <h2>Stat 2</h2>
        <p>Details about stat 2</p>
      </div>
      <div class="stat">
        <h2>Stat 3</h2>
        <p>Details about stat 3</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.logout-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #d32f2f;
}

.stats {
  display: flex;
  gap: 20px;
}

.stat {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
}
</style>
