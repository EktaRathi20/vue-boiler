<script setup lang="ts">
// IMPORTS
import { computed, onMounted, ref, toRef } from 'vue'
import { useField } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import Icons from '@/components/Icons/Icons.vue'

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
  defaultValue: {
    type: String,
    default: '',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  serverError: {
    type: String,
    default: null,
  },
})

// DATA
const name = toRef(props, 'name')
const { value: inputValue, errorMessage } = useField<string>(name)
const showPassword = ref(false)

// COMPUTED
const computedError = computed(() => errorMessage.value || props.serverError)

// HOOKS
onMounted(() => {
  if (props.defaultValue) {
    inputValue.value = props.defaultValue
  }
})
</script>

<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="name" class="block text-sm font-semibold text-gray-700">
      <span v-if="isRequired" class="text-red-500">*</span> {{ label }}
      <span
        v-if="!isRequired"
        class="text-gray-500 text-xs ml-1"
        v-text="t('common.optional')"
      ></span>
    </label>
    <div class="relative">
      <input
        :id="name"
        v-model="inputValue"
        :name="name"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :disabled="readOnly"
        :aria-describedby="`${name}-error`"
        :class="[
          'w-full p-3 border rounded-md text-sm transition duration-200',
          computedError ? 'border-red-500' : 'border-gray-300',
          readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        ]"
      />
      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Icons v-if="showPassword" name="eye"></Icons>
        <Icons v-else name="eyeSlash"></Icons>
      </button>
    </div>
    <slot v-if="!computedError?.trim()" name="footer" />
    <small v-if="computedError" :id="`${name}-error`" class="text-xs text-red-500 mt-1">
      {{ computedError }}
    </small>
  </div>
</template>
