<script setup lang="ts">
import CurrentWeather from './CurrentWeather.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">
      <CurrentWeather />
    </div>
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">02</div>
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">03</div>
    <div class="rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text">04</div>
    <div
      class="col-span-1 md:col-span-2 rounded-lg min-h-80 bg-primary shadow-md shadow-secondary-text"
    >
      05
    </div>
  </div>
</template>
