<script setup lang="ts">
// IMPORTS
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import Card from '@/components/Base/Card.vue'
import TextInput from '@/components/Base/TextInput.vue'
import Password from '@/components/Base/Password.vue'
import Button from '@/components/Base/Button.vue'
import GoogleLogin from '@/components/GoogleLogin.vue'
import { useAuth } from '@/services/useAuth'
import { emailRegex, passwordRegex, setItem } from '@/utils'

// COMPOSABLE
const { t } = useI18n()
const { loginUser } = useAuth()
const router = useRouter()

// SCHEMA
const schema = zod.object({
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
  console.log(values)
  try {
    const response = await loginUser(values)
    setItem('user', JSON.stringify(response))
    router.push({
      name: 'dashboard',
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="login-form flex justify-center">
    <Card :title="t('auth.login.title')">
      <template #card_content>
        <form @submit="onSubmit" class="p-4" novalidate>
          <TextInput
            :is-required="true"
            name="email"
            :label="t('auth.common.email')"
            type="email"
          />
          <Password :is-required="true" name="password" :label="t('auth.common.password')" />

          <div class="mt-4 flex items-center justify-between">
            <Button :label="t('auth.login.title')" type="submit" />
            <p class="text-sm text-right">
              <RouterLink :to="{ name: 'forgotPassword' }" class="underline">{{
                t('auth.login.forgotPassword')
              }}</RouterLink>
            </p>
          </div>
          <p class="text-center text-sm mt-5">
            {{ t('auth.login.newAccount') }}
            <RouterLink :to="{ name: 'register' }" class="underline">{{
              t('auth.register.title')
            }}</RouterLink>
          </p>
        </form>

        <GoogleLogin />
      </template>
    </Card>
  </div>
</template>
