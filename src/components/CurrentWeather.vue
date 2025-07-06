<script setup lang="ts">
import {
  Droplet,
  Waves,
  Wind,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  Sun,
  Cloudy,
  CloudFog,
} from '@/components/icons'
import { computed } from 'vue'
import { useGetWeather } from '@/composables/useWeather'
import { useClock } from '@/composables/useClock'
import { useLocationStore } from '@/stores/location'
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()

const { latitude, longitude } = storeToRefs(locationStore)

const currentWeather = useGetWeather(latitude, longitude)

const getWeatherIconComponent = (weatherMain: string) => {
  switch (weatherMain) {
    case 'Drizzle':
      return CloudDrizzle
    case 'Rain':
      return CloudRain
    case 'Snow':
      return Snowflake
    case 'Clear':
      return Sun
    case 'Clouds':
      return Cloudy
    case 'Mist':
      return CloudFog
    default:
      return Sun
  }
}

const currentMainWeatherIcon = computed(() => {
  const weatherMainCondition = currentWeather.data.value?.generalWeather

  if (weatherMainCondition) {
    return getWeatherIconComponent(weatherMainCondition)
  }

  return Sun
})

const dynamicTimezoneOffset = computed(() => {
  // Ensure currentWeather.data.value is not null/undefined before accessing timezone
  return currentWeather.data.value?.timezone // Assuming your CurrentWeatherResponse now includes 'timezone'
})

// Use the new useClock composable
const localClock = useClock(dynamicTimezoneOffset)
</script>

<template>
  <div class="text-primary-text p-8 select-none">
    <div class="flex flex-col">
      <h1 class="text-xl font-bold">
        {{
          currentWeather.data.value?.city !== undefined ? currentWeather.data.value?.city : 'N/A'
        }},
        {{
          currentWeather.data.value?.country !== undefined
            ? currentWeather.data.value?.country
            : 'N/A'
        }}
      </h1>
      <p class="">{{ localClock.localTime.value ? localClock.localTime.value : 'Loading' }}</p>
    </div>
    <div class="flex justify-center items-center mt-6 mb-6 md:mt-8 md:mb-6">
      <component :is="currentMainWeatherIcon" class="h-20 w-20" />
      <div class="ml-4 relative">
        <p class="text-5xl font-black">
          {{
            currentWeather.data.value?.temperature !== undefined
              ? currentWeather.data.value?.temperature.toFixed(0)
              : 'N/A'
          }}
          <span class="inline-block font-semibold text-xl absolute">°c</span>
        </p>
        <p class="text-sm">
          {{
            currentWeather.data.value?.weatherDescription !== undefined
              ? currentWeather.data.value?.weatherDescription
              : 'N/A'
          }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div class="flex flex-col items-center relative">
        <p class="text-xs mb-1">Sea Level</p>
        <Waves class="h-5 w-5 md:h-8 md:w-8" />
        <p class="text-sm mt-2">
          {{
            currentWeather.data.value?.seaLevel !== undefined
              ? currentWeather.data.value?.seaLevel + 'hPa'
              : 'N/A'
          }}
        </p>
      </div>
      <div class="flex flex-col items-center">
        <p class="text-xs mb-1">Humidity</p>
        <Droplet class="h-5 w-5 md:h-8 md:w-8" />
        <p class="text-sm mt-2">
          {{
            currentWeather.data.value?.humidity !== undefined
              ? currentWeather.data.value?.humidity + '%'
              : 'N/A'
          }}
        </p>
      </div>
      <div class="flex flex-col items-center">
        <p class="text-xs mb-1">Wind</p>
        <Wind class="h-5 w-5 md:h-8 md:w-8" />
        <p class="text-sm mt-2">
          {{
            currentWeather.data.value?.wind !== undefined
              ? currentWeather.data.value.wind.toFixed(1) + ' m/s'
              : 'N/A'
          }}
        </p>
      </div>
      <div class="flex flex-col items-center">
        <p class="text-xs mb-1">Clouds</p>
        <Cloudy class="h-5 w-5 md:h-8 md:w-8" />
        <p class="text-sm mt-2">
          {{
            currentWeather.data.value?.clouds !== undefined
              ? currentWeather.data.value?.clouds + '%'
              : 'N/A'
          }}
        </p>
      </div>
    </div>
  </div>
</template>
