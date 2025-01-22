<script setup lang="ts">
// IMPORTS
import { ref, watch } from 'vue'
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import Table from '@/components/Base/Table.vue'
import TextInput from '@/components/Base/TextInput.vue'
import Button from '@/components/Base/Button.vue'
import { useUser } from '@/services/useUser'
import { type PaginationParams, SortOrder } from '@/models'

// COMPOSABLE
const { t } = useI18n()

// DATA
const columns = ref([
  { key: 'id', label: 'Id', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
])
const tableData = ref([])
const total = ref(0)
const pageSize = 10
const currentPage = ref(1)
const sort = ref({ key: '', order: SortOrder.ASC })
const filters = ref({ search: '' })

// SCHEMA
const schema = zod.object({
  search: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
})

// METHODS
const fetchData = async () => {
  const params: PaginationParams = {
    page: currentPage.value,
    pageSize,
    filters: filters.value,
    sortBy: sort.value.key,
    sortOrder: sort.value.order,
  }

  const response = await useUser().getUsers(params)
  tableData.value = response || []
  total.value = response?.total || 100
}

const onPageChange = (page: number) => {
  currentPage.value = page
}

const onSortChange = (sortParams: { key: string; order: SortOrder }) => {
  sort.value = sortParams
}

const onSubmit = handleSubmit(async (values) => {
  try {
    filters.value.search = values.search
    await fetchData()
  } catch (error) {
    console.log(error)
  }
})

// WATCHERS
watch(
  [currentPage, sort],
  () => {
    fetchData()
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <h1>User Listing</h1>
    <div>
      <!-- Table -->
      <Table
        :columns="columns"
        :data="tableData"
        :total="total"
        :pageSize="pageSize"
        @update:page="onPageChange"
        @update:sort="onSortChange"
      >
        <template #filters>
          <form @submit="onSubmit" class="flex items-center align-center gap-4 mb-4" novalidate>
            <TextInput name="search" placeholder="Search..." wrapper-class="" />
            <Button :label="t('filter.applyFilter')" type="submit" @click="onSubmit()" />
          </form>
        </template>
      </Table>
    </div>
  </div>
</template>
