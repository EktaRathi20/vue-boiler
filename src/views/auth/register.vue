<script setup lang="ts">
// IMPORTS
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from '@/components/Base/Card.vue'
import TextInput from '@/components/Base/TextInput.vue'
import Password from '@/components/Base/Password.vue'
import Button from '@/components/Base/Button.vue'
import { useAuth } from '@/services/useAuth'
import { emailRegex, passwordRegex } from '@/utils'

// COMPOSABLE
const { t } = useI18n()
const { registerUser } = useAuth()
const router = useRouter()

// SCHEMA
const schema = zod.object({
  firstName: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
  lastName: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
  email: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .regex(emailRegex, t('auth.error.email'))
    .default(''),
  password: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .regex(passwordRegex, t('auth.error.password'))
    .default(''),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
})

// METHODS
const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await registerUser(values)
    router.push({
      name: 'login',
    })
    console.log('response', response)
  } catch (error) {
    console.log('error', error)
  }
})
</script>

<template>
  <div class="register-form flex justify-center mt-4">
    <Card :title="t('auth.register.title')" wrapperClass="">
      <template #card_content>
        <form @submit="onSubmit" class="p-4" novalidate>
          <TextInput :is-required="true" name="firstName" :label="t('auth.register.firstName')" />
          <TextInput :is-required="true" name="lastName" :label="t('auth.register.lastName')" />
          <TextInput
            :is-required="true"
            name="email"
            :label="t('auth.common.email')"
            type="email"
          />
          <Password :is-required="true" name="password" :label="t('auth.common.password')" />

          <div class="text-center mt-4">
            <Button :label="t('auth.register.title')" type="submit" />
            <p>
              {{ t('auth.register.alreadyHaveAccount') }}
              <RouterLink :to="{ name: 'login' }" class="underline">
                {{ t('auth.login.title') }}</RouterLink
              >
            </p>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>
