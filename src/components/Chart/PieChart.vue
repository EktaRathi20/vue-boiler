<script setup lang="ts">
// IMPORTS
import { ref, onMounted, watch } from 'vue'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'
import type { PropType } from 'vue'

// Register
Chart.register(PieController, ArcElement, Tooltip, Legend)

// PROPS
const props = defineProps({
  labels: {
    type: Array as PropType<string[]>,
    required: true,
  },
  datasets: {
    type: Array as PropType<
      {
        data: number[]
        backgroundColor: string[]
        borderColor?: string[]
        borderWidth?: number
      }[]
    >,
    required: true,
  },
  chartTitle: {
    type: String,
    default: 'Pie Chart',
  },
  options: {
    type: Object as PropType<Chart['options']>,
    default: () => ({}),
  },
})

// DATA
const pieChart = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

// METHODS
const createChart = () => {
  if (pieChart.value) {
    chartInstance = new Chart(pieChart.value, {
      type: 'pie',
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
    <canvas ref="pieChart"></canvas>
  </div>
</template>
