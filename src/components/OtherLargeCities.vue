<script setup lang="ts">
import { useGetWeather } from '@/composables/useWeather'
import { popularCities } from '@/constants'
import type { PopularCity } from '@/types/main'
import { ref } from 'vue'
import { useMainWeatherIcon } from '@/composables/useWeatherIconLogic'

const citiesWeather = popularCities
  .slice(1, popularCities.length)
  .map(({ lat, lon }: PopularCity) => {
    const latRef = ref(lat)
    const lonRef = ref(lon)
    return useGetWeather(latRef, lonRef)
  })
</script>

<template>
  <div class="p-6 text-primary-text select-none">
    <h1 class="text-lg font-semibold mb-4">Other Large Cities</h1>
    <ul class="mt-4">
      <li v-for="(cityQueryResult, index) in citiesWeather" :key="index" class="mt-3">
        <template v-if="cityQueryResult.data.value">
          <div class="flex items-center">
            <p>{{ cityQueryResult.data.value.city }}, {{ cityQueryResult.data.value.country }}</p>
            <p class="text-sm ml-auto">
              {{ cityQueryResult.data.value.generalWeather }}
            </p>
            <component
              :is="useMainWeatherIcon(citiesWeather[index].data.value?.generalWeather ?? '')"
              class="w-6 h-6 ml-2"
            />
          </div>
        </template>
        <template v-else>
          <p class="text-secondary-text">N/A</p>
        </template>
      </li>
    </ul>
  </div>
</template>
