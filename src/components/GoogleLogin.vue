<script setup lang="ts">
// IMPORTS
import { auth, provider, signInWithPopup } from '@/utils'
import Button from './Base/Button.vue'

// METHODS
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    console.log('User Info:', {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    })

    // You can now use `user` for further operations (e.g., send data to your backend).
  } catch (error: any) {
    console.error('Error during sign-in:', error.message)
  }
}
</script>

<template>
  <div class="google-signin flex justify-center items-center">
    <Button @click="signInWithGoogle" :label="$t('auth.common.googleLogin')" />
  </div>
</template>
