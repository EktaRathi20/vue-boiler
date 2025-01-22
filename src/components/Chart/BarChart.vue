<script setup lang="ts">
// IMPORTS
import { ref, onMounted, watch, type PropType, defineProps } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

// PROPS
const props = defineProps({
  labels: {
    type: Array as PropType<string[]>,
    required: true,
  },
  datasets: {
    type: Array as PropType<
      {
        label: string
        data: number[]
        backgroundColor?: string | string[]
        borderColor?: string | string[]
        borderWidth?: number
      }[]
    >,
    required: true,
  },
  chartTitle: {
    type: String,
    default: 'Bar Chart',
  },
  options: {
    type: Object as PropType<Chart['options']>,
    default: () => ({}),
  },
})

// DATA
const barChart = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

// METHODS
const createChart = () => {
  if (barChart.value) {
    chartInstance = new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels: props.labels,
        datasets: props.datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: props.chartTitle,
          },
        },
        ...props.options,
      },
    })
  }
}

// WATCHERS
watch(
  () => [props.labels, props.datasets],
  () => {
    if (chartInstance) {
      chartInstance.data.labels = props.labels
      chartInstance.data.datasets = props.datasets
      chartInstance.update()
    }
  },
  { deep: true },
)

// HOOKS
onMounted(() => {
  createChart()
})
</script>

<template>
  <div>
    <canvas ref="barChart"></canvas>
  </div>
</template>
