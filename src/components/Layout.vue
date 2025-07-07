<script setup lang="ts">
import CurrentWeather from './CurrentWeather.vue'
import MapViewer from './MapViewer.vue'
import Forecast from './Forecast.vue'
import OtherLargeCities from './OtherLargeCities.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">
      <CurrentWeather />
    </div>
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">
      <MapViewer />
    </div>
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">
      <OtherLargeCities />
    </div>
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">
      <Forecast />
    </div>
    <div
      class="col-span-1 md:col-span-2 rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text"
    >
      05
    </div>
  </div>
</template>
