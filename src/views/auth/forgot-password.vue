<script setup lang="ts">
// IMPORTS
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from '@/components/Base/Card.vue'
import TextInput from '@/components/Base/TextInput.vue'
import Button from '@/components/Base/Button.vue'
import { useAuth } from '@/services/useAuth'

// COMPOSABLE
const { t } = useI18n()
const { forgotPassword } = useAuth()
const router = useRouter()

// SCHEMA
const schema = zod.object({
  email: zod
    .string()
    .email()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
})

// METHODS
const onSubmit = handleSubmit(async (values) => {
  const { email } = values
  try {
    const response = await forgotPassword({ email })
    const otp = response?.otp
    if (otp) {
      router.push({
        name: 'verify-otp',
        query: { email, otp },
      })
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="forgot-password-form flex justify-center">
    <Card :title="t('auth.forgotPassword.title')">
      <template #card_content>
        <form @submit="onSubmit" class="p-4" novalidate>
          <TextInput
            :is-required="true"
            name="email"
            :label="t('auth.common.email')"
            type="email"
          />
          <Button :label="t('auth.forgotPassword.sendResetLink')" type="submit" />
        </form>
        <p class="text-center text-sm mt-3">
          {{ t('auth.forgotPassword.rememberPassword') }}
          <RouterLink :to="{ name: 'login' }" class="font-medium text-primary underline">{{
            t('auth.login.title')
          }}</RouterLink>
        </p>
      </template>
    </Card>
  </div>
</template>
