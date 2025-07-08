import { popularCities } from '@/constants'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultLocation = {
  lat: popularCities[popularCities.length - 1].lat,
  lon: popularCities[popularCities.length - 1].lon,
}

export const useLocationStore = defineStore('location', () => {
  const actualLat = window.localStorage.getItem('latitude')
  const actualLon = window.localStorage.getItem('longitude')

  const latitude = ref<number | null>(defaultLocation.lat)
  const longitude = ref<number | null>(defaultLocation.lon)

  if (actualLat?.length && actualLon?.length) {
    latitude.value = Number(actualLat)
    longitude.value = Number(actualLon)
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const actualLat = position.coords.latitude
        const actualLon = position.coords.longitude
        setLocation(actualLat, actualLon)

        window.localStorage.setItem('latitude', String(actualLat))
        window.localStorage.setItem('longitude', String(actualLon))
      },
      (error) => {
        console.error('Error getting location:', error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0, // dont use cached coords
      },
    )
  } else {
    console.log('Geolocation is not supported by this browser.')
  }

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
