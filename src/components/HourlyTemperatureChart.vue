<template v-if="hourlyTimes.length > 0 && hourlyTemperatures.length > 0">
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  type ChartOptions,
} from 'chart.js'
import { get7DayHourlyForecast } from '@/api/meteo'
import { useLocationStore } from '@/stores/location'

const locationStore = useLocationStore()
const hourlyTimes = ref<string[]>([])
const hourlyTemperatures = ref<number[]>([])

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const fetchHourly = async () => {
  const { times, temperatures } = await get7DayHourlyForecast(
    locationStore.latitude as number,
    locationStore.longitude as number,
  )

  hourlyTimes.value = times
  hourlyTemperatures.value = temperatures
}

onMounted(() => {
  fetchHourly()
})

watch(
  () => [locationStore.latitude, locationStore.longitude],
  ([newLat, newLon], [oldLat, oldLon]) => {
    if (newLat !== oldLat || newLon !== oldLon) {
      if (
        typeof newLat === 'number' &&
        typeof newLon === 'number' &&
        !isNaN(newLat) &&
        !isNaN(newLon)
      ) {
        fetchHourly()
      } else {
        hourlyTimes.value = []
        hourlyTemperatures.value = []
      }
    }
  },
  { deep: true },
)

// Chart.js data structure for the line chart
const chartData = computed(() => {
  const formattedLabels = hourlyTimes.value.map((timeStr: string) => {
    const date = new Date(timeStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  })

  return {
    labels: formattedLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        backgroundColor: '#8580a6',
        borderColor: '#8580a6',
        data: hourlyTemperatures.value,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 4,
        fill: false,
      },
    ],
  }
})

// Chart.js options for customization
// FIX: Explicitly type chartOptions using ChartOptions<'line'>
const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        color: '#8580a6',
        display: true,
        text: 'Time (Hourly)',
      },
    },
    y: {
      title: {
        color: '#8580a6',
        display: true,
        text: 'Temperature (°C)',
      },
    },
  },
  plugins: {
    tooltip: {
      mode: 'index', // This should now be correctly validated as the literal string 'index'
      intersect: false,
    },
    legend: {
      display: true,
    },
    title: {
      color: '#8580a6',
      display: true,
      text: '7-Day Hourly Temperature Forecast',
    },
  },
}
</script>

<style scoped>
/* You might want to give the chart container a specific height in the parent component */
</style>
