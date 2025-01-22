<script setup lang="ts">
// IMPORTS
import { ref, computed, onMounted, toRef, watch } from 'vue'
import { useField } from 'vee-validate'
import { useI18n } from 'vue-i18n'

// COMPOSABLES
const { t } = useI18n()

// PROPS
const props = defineProps({
  numInputs: {
    type: Number,
    required: true,
  },
  defaultValue: {
    type: String,
    default: '',
  },
  serverError: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
    default: '',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

// DATA
const name = toRef(props, 'name')
const otpArray = ref(Array(props.numInputs).fill(''))
const { value: otpValue, errorMessage } = useField(name)

// METHODS
const handleInput = (event: Event, index: number) => {
  const inputEvent = event as InputEvent
  const target = inputEvent.target as HTMLInputElement

  if (!target) return

  const value = target.value

  // Only allow numeric characters
  if (!/^\d*$/.test(value)) {
    target.value = ''
    return
  }

  otpArray.value = [...otpArray.value.slice(0, index), value, ...otpArray.value.slice(index + 1)]
  otpValue.value = otpArray.value.join('')

  // Move to the next input if the current input is filled
  if (value && index < props.numInputs - 1) {
    const nextInput = document.getElementById(`${name.value}-${index + 2}`)
    if (nextInput) {
      nextInput.focus()
    }
  }
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
  // Move to the previous input if backspace is pressed and the current input is empty
  if (event.key === 'Backspace' && !otpArray.value[index] && index > 0) {
    const prevInput = document.getElementById(`${name.value}-${index}`)
    if (prevInput) {
      prevInput.focus()
    }
  }
}

// COMPUTED
const computedError = computed(() => errorMessage.value || props.serverError)

// WATCHERS
watch(
  otpValue,
  (newValue) => {
    if (typeof newValue === 'string') {
      otpArray.value = newValue.split('')
    }
  },
  { immediate: true },
)

// HOOKS
onMounted(() => {
  if (props.defaultValue) {
    otpArray.value = props.defaultValue.split('')
  }
})
</script>

<template>
  <div class="mb-4">
    <label v-if="label" :for="name" class="flex items-center gap-1">
      <span v-if="isRequired" class="text-red-500">*</span> {{ label }}
      <span
        v-if="!isRequired"
        class="text-gray-500 text-xs ml-1"
        v-text="t('common.optional')"
      ></span>
    </label>
    <div class="flex flex-column gap-2" :class="wrapperClass">
      <input
        v-for="index in props.numInputs"
        :key="index"
        type="text"
        v-model="otpArray[index - 1]"
        :id="`${name}-${index}`"
        :name="name"
        :placeholder="placeholder"
        :maxlength="1"
        class="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
        :disabled="readOnly"
        :class="{ 'border-red-500': computedError }"
        :aria-describedby="`${name}-error`"
        @input="handleInput($event, index - 1)"
        @keydown="handleKeydown($event, index - 1)"
      />
    </div>
    <small v-if="computedError" :id="`${name}-error`" class="text-xs text-red-500">
      {{ computedError }}
    </small>
  </div>
</template>
