<script setup lang="ts">
// IMPORTS
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from '@/components/Base/Button.vue'
import Password from '@/components/Base/Password.vue'
import Card from '@/components/Base/Card.vue'
import { useAuth } from '@/services/useAuth'
import { passwordRegex } from '@/utils'

// COMPOSABLES
const { t } = useI18n()
const { resetPassword } = useAuth()
const router = useRouter()

// SCHEMA
const schema: any = zod.object({
  newPassword: zod
    .string()
    .regex(passwordRegex, t('auth.error.password'))
    .nonempty({ message: t('common.nonempty') })
    .default(''),
  confirmPassword: zod
    .string()
    .regex(passwordRegex, t('auth.error.password'))
    .nonempty({ message: t('common.nonempty') })
    .refine((val) => val === values.newPassword, {
      message: t('auth.error.passwordsDoNotMatch'),
    })
    .default(''),
})

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(schema),
})

// METHODS
const onSubmit = handleSubmit(async (values) => {
  const { newPassword, confirmPassword } = values

  try {
    const response = await resetPassword({ newPassword, confirmPassword })
    router.push({
      name: 'login',
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="change-password-form flex justify-center">
    <Card :title="t('auth.resetPassword.title')">
      <template #card_content>
        <form @submit="onSubmit" class="p-4" novalidate>
          <Password :is-required="true" name="newPassword" :label="t('auth.common.newPassword')" />
          <Password
            :is-required="true"
            name="confirmPassword"
            :label="t('auth.common.confirmPassword')"
          />
          <Button :label="t('auth.resetPassword.title')" type="submit" />
        </form>
      </template>
    </Card>
  </div>
</template>
