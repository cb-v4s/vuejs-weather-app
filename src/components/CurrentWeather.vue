<script setup lang="ts">
import { Cloudy, Droplet, MapPin, Waves, Wind } from '@/components/icons'
import { useGetWeather } from '@/composables/useWeather'
import { useMainWeatherIcon } from '@/composables/useWeatherIconLogic'
import { useLocationStore } from '@/stores/location'
import AnalogClock from './AnalogClock.vue'
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { latitude, longitude } = storeToRefs(locationStore)
const currentWeather = useGetWeather(latitude, longitude)
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
        <MapPin class="w-5 h-5 inline-block -mt-1" />
      </h1>
      <p class="">{{ latitude && longitude ? `${latitude}, ${longitude}` : 'Loading' }}</p>
    </div>
    <div class="flex items-center justify-center flex-col md:flex-row mt-6 mb-10 md:mt-4 md:mb-6">
      <div class="flex mb-8 md:mb-0">
        <component
          :is="useMainWeatherIcon(currentWeather.data.value?.generalWeather ?? '')"
          class="h-20 w-20"
        />
        <div class="ml-2 md:ml-4 relative">
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

      <AnalogClock
        v-if="currentWeather.data.value?.timezone !== undefined"
        :timezone="currentWeather.data.value?.timezone"
      />
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
