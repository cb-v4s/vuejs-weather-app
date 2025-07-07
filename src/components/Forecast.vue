<script setup lang="ts">
import { useGetForecast } from '@/composables/useWeather'
import { useLocationStore } from '@/stores/location'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

// Import Lucide Icons you'll need. You'll import more as you map more codes.
// You might want to import all of them, or selectively import based on your mapping.
import {
  Sun, // For clear sky
  Cloud, // For cloudy, overcast, mainly clear
  CloudRain, // For rain, drizzle, rain showers
  CloudSnow, // For snow
  CloudLightning, // For thunderstorm
  CloudFog, // For fog
  CloudDrizzle, // For drizzle (alternative to CloudRain)
  Snowflake, // Another snow option
  CloudSun, // For partly cloudy day
  CloudMoon, // For partly cloudy night
  ThermometerSnowflake, // For freezing rain/drizzle
  Zap, // For general storm/lightning
  // Add any other icons you might need
} from 'lucide-vue-next'

const locationStore = useLocationStore()
const { latitude, longitude } = storeToRefs(locationStore)

const forecastData = useGetForecast(latitude, longitude)

// Helper to interpret weather codes and return the Lucide Icon COMPONENT
// The 'isDay' parameter is usually for current/hourly weather. For daily,
// you might just use a general day icon or a single icon for the whole day.
const getWeatherIconComponent = (code: number, isDay: boolean = true) => {
  switch (code) {
    case 0:
      return Sun // Clear sky
    case 1:
      return isDay ? CloudSun : CloudMoon // Mainly clear (day/night)
    case 2:
      return isDay ? CloudSun : CloudMoon // Partly cloudy (day/night)
    case 3:
      return Cloud // Overcast/Cloudy
    case 45:
    case 48:
      return CloudFog // Fog
    case 51:
    case 53:
    case 55:
      return CloudDrizzle // Drizzle
    case 56:
    case 57:
      return ThermometerSnowflake // Freezing Drizzle (suggests cold + drizzle)
    case 61:
    case 63:
    case 65:
      return CloudRain // Rain
    case 66:
    case 67:
      return ThermometerSnowflake // Freezing Rain
    case 71:
    case 73:
    case 75:
      return CloudSnow // Snow fall
    case 77:
      return Snowflake // Snow grains
    case 80:
    case 81:
    case 82:
      return CloudRain // Rain showers
    case 85:
    case 86:
      return CloudSnow // Snow showers
    case 95:
      return CloudLightning // Thunderstorm
    case 96:
    case 99:
      return CloudLightning // Thunderstorm with hail
    default:
      return Cloud // Default for unknown codes
  }
}

// Helper to interpret weather codes for text description (keep this for accessibility)
const getWeatherDescription = (code: number): string => {
  switch (code) {
    case 0:
      return 'Clear sky'
    case 1:
      return 'Mainly clear'
    case 2:
      return 'Partly cloudy'
    case 3:
      return 'Overcast'
    case 45:
    case 48:
      return 'Fog'
    case 51:
    case 53:
    case 55:
      return 'Drizzle'
    case 56:
    case 57:
      return 'Freezing Drizzle'
    case 61:
    case 63:
    case 65:
      return 'Rain'
    case 66:
    case 67:
      return 'Freezing Rain'
    case 71:
    case 73:
    case 75:
      return 'Snow fall'
    case 77:
      return 'Snow grains'
    case 80:
    case 81:
    case 82:
      return 'Rain showers'
    case 85:
    case 86:
      return 'Snow showers'
    case 95:
      return 'Thunderstorm'
    case 96:
    case 99:
      return 'Thunderstorm with hail'
    default:
      return 'Unknown'
  }
}

// Optional: A computed property to format the date for display
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

// Optional: A computed property to get the current day's name for the header
const todayName = computed(() => {
  if (forecastData.data.value?.daily?.time?.[0]) {
    return new Date(forecastData.data.value.daily.time[0]).toLocaleDateString('en-US', {
      weekday: 'long',
    })
  }
  return 'Today'
})
</script>

<template>
  <div class="p-6 text-primary-text">
    <h1 class="text-lg font-semibold mb-4">7 Day Forecast</h1>

    <div v-if="forecastData.isLoading.value">N/A</div>
    <div v-else-if="forecastData.isError.value">
      Error: {{ forecastData.error.value?.message || 'Failed to load forecast.' }}
    </div>

    <ul v-else-if="forecastData.data.value">
      <li
        v-for="(time, index) in forecastData.data.value.daily.time"
        :key="time"
        class="flex items-center justify-between mt-3"
      >
        <p class="font-semibold w-1/3">
          {{ formatDate(time) }}
        </p>

        <div class="flex items-center justify-end w-2/3 text-right">
          <p class="text-sm">
            {{ getWeatherDescription(forecastData.data.value.daily.weather_code[index]) }}
          </p>
          <component
            :is="getWeatherIconComponent(forecastData.data.value.daily.weather_code[index], true)"
            class="w-6 h-6 ml-2"
            :aria-label="getWeatherDescription(forecastData.data.value.daily.weather_code[index])"
          />
        </div>
      </li>
    </ul>

    <div v-else class="text-center text-gray-500 dark:text-gray-400">
      No forecast data available.
    </div>
  </div>
</template>
