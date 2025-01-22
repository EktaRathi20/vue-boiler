<script setup lang="ts">
// IMPORTS
import { ref } from 'vue'
import zod from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import ImageCompress from '@/components/Base/ImageCompress.vue'
import Button from '@/components/Base/Button.vue'
import Modal from '@/components/Base/Modal.vue'
import BarChart from '@/components/Chart/BarChart.vue'
import Icons from '@/components/Icons/Icons.vue'
import TextInput from '@/components/Base/TextInput.vue'
import LineChart from '@/components/Chart/LineChart.vue'
import PieChart from '@/components/Chart/PieChart.vue'
import TextEditor from '@/components/Base/TextEditor.vue'
import { setEncodedCookie, getDecodedCookie, eraseCookie, pdfService } from '@/utils'

// COMPOSABLE
const { t } = useI18n()

// DATA
const cookieValue = ref<string | null>(null)
const isModalVisible = ref(false)

// METHODS
const handleFileUpload = (file: File) => {
  console.log('File uploaded:', file)
}

const handleScroll = () => {
  console.log('Element scrolled into view')
}

const handleClickOutside = (event: Event) => {
  console.log('Clicked outside:', event)
}

const setCookie = () => {
  setEncodedCookie('testCookie', 'testValue', 1)
  console.log('Cookie set: testCookie=testValue')
}

const getCookie = () => {
  cookieValue.value = getDecodedCookie('testCookie')
  console.log('Cookie retrieved:', cookieValue.value)
}

const eraseTestCookie = () => {
  eraseCookie('testCookie')
  console.log('Cookie erased: testCookie')
}

const generatePdf = () => {
  const element = document.getElementById('pdf-container')
  pdfService(element)
}

const schema = zod.object({
  input: zod
    .string()
    .nonempty({ message: t('common.nonempty') })
    .default(''),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = handleSubmit(async (values) => {
  console.log('Form submitted', values)
})
</script>

<!-- <template>
  <div class="p-4 space-y-8" id="pdf-container">
    <h1 class="text-3xl font-bold mb-4">Documentation</h1>
    <section>
      <h2 class="text-2xl font-semibold mb-2">Auth Section</h2>
      <RouterLink
        :to="{ name: 'register' }"
        class="text-blue-500 hover:text-blue-700 underline font-semibold transition-colors duration-200"
      >
        Auth</RouterLink
      >
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-2">Chat Room</h2>
      <RouterLink
        :to="{ name: 'chat' }"
        class="text-blue-500 hover:text-blue-700 underline font-semibold transition-colors duration-200"
      >
        Chat Room</RouterLink
      >
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-2">Image Compress Example</h2>
      <ImageCompress />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-2">File Upload Example</h2>
      <Button :file-upload="true" label="file Upload" @upload="handleFileUpload">
        <template #icon>
          <Icons name="upload" />
        </template>
      </Button>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-2">Modal Popups Example</h2>
      <Button @click="isModalVisible = true" label="Open Modal" />
      <Modal :show="isModalVisible" @close="isModalVisible = false">
        <template v-slot:header>
          <h3 class="text-2xl font-semibold">{{ t('common.title') }}</h3>
        </template>
        <template v-slot:body>
          <div>
            <form @submit.prevent="onSubmit" class="space-y-4">
              <TextInput placeholder="Enter something" name="input" />
            </form>
          </div>
        </template>
        <template v-slot:footer>
          <div class="flex justify-end space-x-4">
            <Button type="submit" @click="onSubmit" label="Submit" />
            <Button @click="isModalVisible = false" label="Cancel" />
          </div>
        </template>
      </Modal>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-2">Custom Directives Example</h2>
      <div>
        <h3 class="text-xl font-semibold mb-2">v-focus Directive</h3>
        <input
          v-focus
          placeholder="This input should be focused"
          class="border border-gray-300 p-2 rounded"
        />
      </div>
      <div class="mt-4">
        <h3 class="text-xl font-semibold mb-2">v-scroll Directive</h3>
        <div v-scroll="handleScroll" class="border border-gray-300 p-2 rounded h-20 overflow-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus dolore eum
          voluptatum dignissimos doloremque at vitae amet id, qui modi! Consectetur, iste numquam
          hic rem deserunt mollitia explicabo quos earum eius vero qui dolore! Rem quam, reiciendis
          sint quibusdam, recusandae, voluptatum numquam nemo nesciunt ex corrupti distinctio quis
          reprehenderit odit modi voluptates sunt doloremque. Dignissimos, placeat! Suscipit vel
          animi aliquid! Magni nihil vel, labore, nemo sapiente harum quo accusamus perferendis,
          iusto dolores exercitationem. Sapiente reprehenderit odit dicta quo autem. Ad, rem cum.
          Obcaecati corrupti dicta non, harum dolores, officiis facilis, ab ipsa dolore iusto
          voluptate excepturi libero quasi adipisci eveniet. Dolor accusantium nulla consequuntur ab
          sit a est, iste pariatur. Deserunt consequatur odit ipsum ut eum voluptatibus laborum
          modi, tempora unde reprehenderit impedit, nostrum voluptas iusto! Dolorum placeat, esse
          distinctio voluptate odit perspiciatis culpa, accusantium cupiditate illum mollitia
          eveniet sapiente corporis, corrupti perferendis repellat! Libero quo quidem delectus quis
          vitae sint, non cum magnam accusamus deleniti architecto perferendis nulla corrupti
          assumenda. Error possimus assumenda reprehenderit inventore consectetur nobis quaerat
          ducimus quae eos laudantium omnis voluptatum quo doloribus explicabo, quas fugiat
          quibusdam officia dignissimos temporibus neque, atque deserunt et aliquid! Obcaecati velit
          recusandae ducimus itaque facere, perspiciatis soluta eos omnis corrupti dolor non.
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-xl font-semibold mb-2">v-click-outside Directive</h3>
        <div v-click-outside="handleClickOutside" class="border border-gray-300 p-2 rounded">
          Click outside this box to trigger an event.
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-2xl font-semibold mb-2">Cookie Example</h2>
      <div class="flex gap-4">
        <button
          @click="setCookie"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Set Cookie
        </button>
        <button
          @click="getCookie"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Get Cookie
        </button>
        <button
          @click="eraseTestCookie"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Erase Cookie
        </button>
        <p v-if="cookieValue">Cookie Value: {{ cookieValue }}</p>
      </div>
    </section>
    <section>
      <div class="chart">
        <BarChart
          :labels="['January', 'February', 'March', 'April']"
          :datasets="[
            {
              label: 'Sales',
              data: [65, 59, 80, 81],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Revenue',
              data: [28, 48, 40, 19],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ]"
          chartTitle="Monthly Sales and Revenue"
          :options="{ scales: { y: { beginAtZero: true } } }"
        />
        <LineChart
          :labels="['January', 'February', 'March', 'April']"
          :datasets="[
            {
              label: 'Temperature',
              data: [3, 6, 9, 12],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
            },
          ]"
          chartTitle="Monthly Temperature"
          :options="{ scales: { y: { beginAtZero: true } } }"
        />
        <PieChart
          :labels="['Red', 'Blue', 'Yellow', 'Green']"
          :datasets="[
            {
              data: [10, 20, 30, 40],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ]"
          chartTitle="Color Distribution"
        />
      </div>
    </section>
    <section>
      <h2 class="text-2xl font-semibold mb-2">PDF Generation Example</h2>
      <Button label="Generate PDF" @click="generatePdf" />
    </section>
    <section>
      <h2 class="text-2xl font-semibold mb-2">Text Editor Example</h2>
      <TextEditor />
    </section>
  </div>
</template> -->
<template>
  <div class="p-6 space-y-12 bg-gray-100 min-h-screen" id="pdf-container">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Documentation</h1>

    <!-- Auth Section -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Auth Section</h2>
      <RouterLink
        :to="{ name: 'register' }"
        class="text-blue-500 hover:text-blue-700 underline font-semibold"
      >
        Go to Auth
      </RouterLink>
    </section>

    <!-- Chat Room -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Chat Room</h2>
      <RouterLink
        :to="{ name: 'chat' }"
        class="text-blue-500 hover:text-blue-700 underline font-semibold"
      >
        Go to Chat Room
      </RouterLink>
    </section>

    <!-- Image Compress -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Image Compress Example</h2>
      <ImageCompress />
    </section>

    <!-- File Upload -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">File Upload Example</h2>
      <Button :file-upload="true" label="File Upload" @upload="handleFileUpload">
        <template #icon>
          <Icons name="upload" />
        </template>
      </Button>
    </section>

    <!-- Modal Popup -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Modal Popups Example</h2>
      <Button @click="isModalVisible = true" label="Open Modal" />
      <Modal :show="isModalVisible" @close="isModalVisible = false">
        <template v-slot:header>
          <h3 class="text-xl font-semibold text-gray-800">{{ t('common.title') }}</h3>
        </template>
        <template v-slot:body>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <TextInput placeholder="Enter something" name="input" />
          </form>
        </template>
        <template v-slot:footer>
          <div class="flex justify-end space-x-4">
            <Button type="submit" @click="onSubmit" label="Submit" />
            <Button @click="isModalVisible = false" label="Cancel" />
          </div>
        </template>
      </Modal>
    </section>

    <!-- Custom Directives -->
    <section class="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 class="text-2xl font-semibold text-gray-700">Custom Directives Example</h2>

      <!-- v-focus -->
      <div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">v-focus Directive</h3>
        <input
          v-focus
          placeholder="This input should be focused"
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <!-- v-scroll -->
      <div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">v-scroll Directive</h3>
        <div v-scroll="handleScroll" class="border border-gray-300 p-4 rounded h-20 overflow-auto">
          Scrollable content here...
        </div>
      </div>

      <!-- v-click-outside -->
      <div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">v-click-outside Directive</h3>
        <div v-click-outside="handleClickOutside" class="border border-gray-300 p-4 rounded">
          Click outside this box to trigger an event.
        </div>
      </div>
    </section>

    <!-- Cookie Example -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Cookie Example</h2>
      <div class="flex items-center space-x-4">
        <button
          @click="setCookie"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Set Cookie
        </button>
        <button
          @click="getCookie"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Get Cookie
        </button>
        <button
          @click="eraseTestCookie"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Erase Cookie
        </button>
        <p v-if="cookieValue" class="text-gray-600">Cookie Value: {{ cookieValue }}</p>
      </div>
    </section>

    <!-- Charts -->
    <section class="bg-white rounded-lg shadow p-6 flex text-center item-center">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Charts Example</h2>
      <div class="space-y-6 flex flex-col item-center w-6/12">
        <BarChart
          :labels="['January', 'February', 'March', 'April']"
          :datasets="[
            {
              label: 'Sales',
              data: [65, 59, 80, 81],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Revenue',
              data: [28, 48, 40, 19],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ]"
          chartTitle="Monthly Sales and Revenue"
          :options="{ scales: { y: { beginAtZero: true } } }"
        />
        <LineChart
          :labels="['January', 'February', 'March', 'April']"
          :datasets="[
            {
              label: 'Temperature',
              data: [3, 6, 9, 12],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
            },
          ]"
          chartTitle="Monthly Temperature"
          :options="{ scales: { y: { beginAtZero: true } } }"
        />
        <PieChart
          :labels="['Red', 'Blue', 'Yellow', 'Green']"
          :datasets="[
            {
              data: [10, 20, 30, 40],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ]"
          chartTitle="Color Distribution"
        />
      </div>
    </section>

    <!-- Text Editor -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Text Editor Example</h2>
      <TextEditor />
    </section>

    <!-- PDF Generation -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">PDF Generation</h2>
      <Button label="Generate PDF" @click="generatePdf" />
    </section>
  </div>
</template>

<style scoped></style>
