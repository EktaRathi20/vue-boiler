<script setup lang="ts">
// LIBRARIES
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from '@/components/Base/Card.vue'
import Button from '@/components/Base/Button.vue'
import InputOtp from '@/components/Base/InputOtp.vue'
import TextInput from '@/components/Base/TextInput.vue'
import { useAuth } from '@/services/useAuth'

// COMPOSABLES
const { t } = useI18n()
const { verifyOtp } = useAuth()
const route = useRoute()
const router = useRouter()

// SCHEMA
const schema = zod.object({
  email: zod
    .string()
    .email()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
  otp: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
})

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema),
})

// METHODS
const onSubmit = handleSubmit(async (values) => {
  try {
    await verifyOtp(values)
    router.push({
      name: 'resetPassword',
    })
  } catch (error) {
    console.log(error)
  }
})

// HOOKS
onMounted(() => {
  const { email, otp } = route.query
  if (email && otp) {
    setFieldValue('email', email as any)
    setFieldValue('otp', otp as any)
  }
})
</script>

<template>
  <div class="verify-otp-form flex justify-center">
    <Card :title="t('auth.verifyOTP.title')">
      <template #card_content>
        <form @submit="onSubmit" class="p-4" novalidate>
          <TextInput
            name="email"
            type="email"
            :label="t('auth.common.email')"
            :is-required="true"
          />
          <InputOtp
            name="otp"
            :numInputs="6"
            :label="t('auth.verifyOTP.otp')"
            :is-required="true"
            wrapper-class=""
          />
          <Button :label="t('auth.verifyOTP.title')" type="submit" />
        </form>
      </template>
    </Card>
  </div>
</template>
