<script setup lang="ts">
// IMPORTS
import { ref, computed } from 'vue'
import { type Column } from '@/models'
import Button from './Button.vue'

// PROPS
const props = defineProps({
  columns: {
    type: Array as () => Column[],
    required: true,
  },
  data: {
    type: Array as () => any[],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
})

// EMIT
const emits = defineEmits(['update:page', 'update:sort'])

// DATA
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

// METHODS
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    emits('update:page', page)
  }
}

const onSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emits('update:sort', { key: sortKey.value, order: sortOrder.value })
}

const getSortIcon = (key: string) => {
  if (key === sortKey.value) {
    return sortOrder.value === 'asc' ? '▲' : '▼'
  }
  return ''
}
</script>

<template>
  <div class="m-5 p-6 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-lg shadow-lg">
    <!-- Filters Slot -->
    <slot name="filters" />

    <!-- Table -->
    <table class="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
      <thead class="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            @click="col.sortable && onSort(col.key)"
            class="px-6 py-3 text-left font-semibold cursor-pointer select-none"
            :class="{ 'hover:bg-blue-600': col.sortable }"
          >
            {{ col.label }}
            <span v-if="col.sortable" class="ml-2 text-sm">
              {{ getSortIcon(col.key) || '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in data"
          :key="row.id"
          class="even:bg-gray-50 odd:bg-white hover:bg-blue-100 transition duration-200"
        >
          <td v-for="col in columns" :key="col.key" class="px-6 py-4 border-t border-gray-200">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-6 flex justify-end items-center space-x-4">
      <Button label="Previous" @click="changePage(currentPage - 1)" :disabled="currentPage === 1" />

      <span class="text-gray-600 text-lg font-medium">
        <span class="font-bold">{{ currentPage }}</span> -
        <span class="font-bold">{{ totalPages }}</span>
      </span>
      <Button
        label="Next"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      />
    </div>
  </div>
</template>
