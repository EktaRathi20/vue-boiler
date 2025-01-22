<script setup lang="ts">
// IMPORTS
import { computed, onMounted, toRef } from 'vue'
import { useField } from 'vee-validate'
import { useI18n } from 'vue-i18n'

// COMPOSABLES
const { t } = useI18n()

// PROPS
const props = defineProps({
  isRequired: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  wrapperClass: {
    type: String,
    default: 'mb-4',
  },
  type: {
    type: String,
    default: 'text',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  defaultValue: {
    type: String,
    default: '',
  },
  serverError: {
    type: String,
    default: null,
  },
})

// DATA
const name = toRef(props, 'name')
const { value: inputValue, errorMessage } = useField<string>(name)

// COMPUTED
const computedError = computed(() => errorMessage.value || props.serverError)

// HOOKS
onMounted(async () => {
  if (props.defaultValue) {
    inputValue.value = props.defaultValue
  }
})
</script>

<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-semibold text-gray-700 flex items-center"
    >
      <span v-if="isRequired" class="text-red-500">*</span> {{ label }}
      <span
        v-if="!isRequired"
        class="text-gray-500 text-xs ml-1"
        v-text="t('common.optional')"
      ></span>
    </label>
    <input
      :id="name"
      ref="inputField"
      v-model="inputValue"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :disabled="readOnly"
      :aria-describedby="`${name}-error`"
      :class="[
        'w-full p-3 border rounded-md text-sm transition duration-200',
        computedError ? 'border-red-500' : 'border-gray-300',
        readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
      ]"
    />
    <slot v-if="!computedError?.trim()" name="footer" />
    <small v-if="computedError" :id="`${name}-error`" class="text-xs text-red-500 mt-1">
      {{ computedError }}
    </small>
  </div>
</template>
