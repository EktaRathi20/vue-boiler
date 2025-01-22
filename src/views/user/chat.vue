<script setup lang="ts">
// IMPORTS
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { push, onValue } from 'firebase/database'
import { database, ref as dbRef } from '@/utils'
import Button from '@/components/Base/Button.vue'
import TextInput from '@/components/Base/TextInput.vue'

// COMPOSABLES
const { t } = useI18n()

// DATA
const messages: any = ref([])
const currentUser = 'User1'

// SCHEMA
const schema = zod.object({
  newMessage: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
})

// METHODS
const getMessages = () => {
  const messagesRef = dbRef(database, 'messages')
  onValue(messagesRef, (snapshot) => {
    const data: any[] = []
    snapshot.forEach((childSnapshot) => {
      data.push(childSnapshot.val())
    })
    messages.value = data
  })
}

// Send a new message
const onSubmit = handleSubmit(async (values) => {
  if (values.newMessage.trim()) {
    const messagesRef = dbRef(database, 'messages')
    await push(messagesRef, {
      user: currentUser,
      text: values.newMessage,
      timestamp: new Date().toISOString(),
    })
    values.newMessage = ''
  }
})

// HOOKS
onMounted(() => {
  getMessages()
})
</script>

<template>
  <div
    class="flex flex-col h-screen max-w-lg mx-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden"
  >
    <div class="bg-blue-500 text-white p-4 text-center">
      <h2 class="text-lg font-semibold">{{ t('chat.chatRoom') }}</h2>
    </div>
    <div class="flex-1 p-4 overflow-y-auto bg-gray-100">
      <div v-for="(message, index) in messages" :key="index" class="mb-2">
        <span class="font-bold">{{ message.user }}:</span>
        <span>{{ message.text }}</span>
      </div>
    </div>
    <div class="flex p-4">
      <TextInput name="newMessage" placeholder="Type a message" wrapper-class="flex-1 p-2 mr-2" />
      <Button :label="t('common.send')" @click="onSubmit" />
    </div>
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.messages {
  flex: 1;
  overflow-y: auto;
}
input {
  margin-top: 10px;
}
</style>
