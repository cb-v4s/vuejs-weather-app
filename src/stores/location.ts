// src/stores/location.ts
import { popularCities } from '@/constants'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultLocation = {
  lat: popularCities[0].lat,
  lon: popularCities[0].lon,
}

export const useLocationStore = defineStore('location', () => {
  const latitude = ref<number | null>(defaultLocation.lat)
  const longitude = ref<number | null>(defaultLocation.lon)

  const setLocation = (newLat: number, newLon: number) => {
    latitude.value = newLat
    longitude.value = newLon
  }

  const resetToDefaultLocation = () => {
    latitude.value = defaultLocation.lat
    longitude.value = defaultLocation.lon
  }

  return {
    latitude,
    longitude,
    setLocation,
    resetToDefaultLocation,
  }
})
