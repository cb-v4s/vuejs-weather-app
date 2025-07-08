<template>
  <div ref="mapContainerRef" class="map-container w-full min-h-80 h-full focus:outline-none"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
})

import { useLocationStore } from '@/stores/location'
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()

const { latitude, longitude } = storeToRefs(locationStore)

const mapContainerRef = ref<HTMLElement | null>(null)
let mapInstance: L.Map | null = null
let currentMarker: L.Marker | null = null

onMounted(async () => {
  await nextTick()

  if (mapContainerRef.value && !mapInstance) {
    mapInstance = L.map(mapContainerRef.value, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    }).setView([Number(latitude.value), Number(longitude.value)], 10)

    L.tileLayer(`https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png`, {
      maxZoom: 20,
      minZoom: 0,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(mapInstance)

    mapInstance.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng

      if (currentMarker) {
        currentMarker.remove()
      }

      currentMarker = L.marker([lat, lng]).addTo(mapInstance!)

      locationStore.setLocation(lat, lng)
    })

    if (latitude.value !== null && longitude.value !== null) {
      currentMarker = L.marker([latitude.value, longitude.value]).addTo(mapInstance)
    }

    mapInstance.invalidateSize()
  }
})

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }

  if (currentMarker) {
    currentMarker.remove()
    currentMarker = null
  }
})

const updateMarker = (lat: number, lon: number) => {
  if (!mapInstance) return

  if (currentMarker) {
    currentMarker.remove()
  }
  currentMarker = L.marker([lat, lon]).addTo(mapInstance)
}

watch(
  [latitude, longitude],
  ([newLat, newLon]) => {
    if (
      mapInstance &&
      newLat !== null &&
      newLon !== null &&
      typeof newLat === 'number' &&
      typeof newLon === 'number'
    ) {
      const currentZoom = mapInstance.getZoom()
      mapInstance.setView([newLat, newLon], currentZoom)
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
