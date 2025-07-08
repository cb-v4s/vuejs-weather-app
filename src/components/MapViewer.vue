<template>
  <div ref="mapContainerRef" class="map-container w-full min-h-80 h-full focus:outline-none"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue' // Import nextTick
import L from 'leaflet'
import { useLocationStore } from '@/stores/location'
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()

const { latitude, longitude } = storeToRefs(locationStore)

const mapContainerRef = ref<HTMLElement | null>(null)
let mapInstance: L.Map | null = null
let currentMarker: L.Marker | null = null

onMounted(async () => {
  // Use nextTick to ensure the DOM is fully rendered and the mapContainerRef
  // has its final dimensions before Leaflet tries to initialize.
  await nextTick()

  if (mapContainerRef.value && !mapInstance) {
    // Ensure map not already initialized
    mapInstance = L.map(mapContainerRef.value, {
      // Optional: Add some map options that might help with behavior
      zoomControl: true, // Display zoom +/- buttons
      attributionControl: true, // Display attribution text
      scrollWheelZoom: true, // Enable zoom with scroll wheel
    }).setView([Number(latitude.value), Number(longitude.value)], 10) // Center on Caracas, zoom 10

    L.tileLayer(`https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png`, {
      maxZoom: 20,
      minZoom: 0,
    }).addTo(mapInstance)

    mapInstance.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng

      // 1. Remove existing marker if any
      if (currentMarker) {
        currentMarker.remove() // Remove the marker from the map
      }

      // 2. Create a new marker at the clicked location
      currentMarker = L.marker([lat, lng]).addTo(mapInstance!)

      // update global state with new location
      locationStore.setLocation(lat, lng)
    })

    if (latitude.value !== null && longitude.value !== null) {
      currentMarker = L.marker([latitude.value, longitude.value]).addTo(mapInstance)
    }

    // Crucial for ensuring Leaflet correctly calculates its viewport
    // especially if the container's size is dynamic or set after the initial render.
    // Call it once after the map is fully set up.
    mapInstance.invalidateSize()
  }
})

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove() // Properly removes the map from the DOM and cleans up listeners
    mapInstance = null
  }

  if (currentMarker) {
    currentMarker.remove() // Remove the marker as well
    currentMarker = null
  }
})

const updateMarker = (lat: number, lon: number) => {
  if (!mapInstance) return // Ensure map is initialized

  if (currentMarker) {
    currentMarker.remove() // Remove existing marker
  }
  currentMarker = L.marker([lat, lon]).addTo(mapInstance)
}

watch(
  [latitude, longitude],
  ([newLat, newLon]) => {
    // Only update if map is initialized and new coordinates are valid numbers
    if (
      mapInstance &&
      newLat !== null &&
      newLon !== null &&
      typeof newLat === 'number' &&
      typeof newLon === 'number'
    ) {
      const currentZoom = mapInstance.getZoom() // Keep current zoom level
      mapInstance.setView([newLat, newLon], currentZoom)

      // Also update the marker's position
      updateMarker(newLat, newLon)
    }
  },
  { immediate: false },
)
</script>

<style scoped>
.map-container {
  z-index: 20;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
}
</style>
