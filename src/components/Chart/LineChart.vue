<script setup lang="ts">
// IMPORTS
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { PropType } from 'vue'

// Register
Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
)

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
        borderColor?: string
        backgroundColor?: string
        tension?: number
        borderWidth?: number
      }[]
    >,
    required: true,
  },
  chartTitle: {
    type: String,
    default: 'Line Chart',
  },
  options: {
    type: Object as PropType<Chart['options']>,
    default: () => ({}),
  },
})

// DATA
const lineChart = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

// METHODS
const createChart = () => {
  if (lineChart.value) {
    chartInstance = new Chart(lineChart.value, {
      type: 'line',
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
    <canvas ref="lineChart"></canvas>
  </div>
</template>
