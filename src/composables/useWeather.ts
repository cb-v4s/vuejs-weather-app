import { useQuery } from '@tanstack/vue-query'
import { getCurrentWeather } from '@/api/weather'
import { get7DayHourlyForecast, getForecast } from '@/api/meteo'
import { computed, type Ref, unref } from 'vue'

export const useGetWeather = (
  latRef: Ref<number | null | undefined>,
  lonRef: Ref<number | null | undefined>,
) => {
  const weatherQueryKey = computed(() => {
    return ['weather', unref(latRef), unref(lonRef)]
  })

  const isQueryEnabled = computed(() => {
    return typeof unref(latRef) === 'number' && typeof unref(lonRef) === 'number'
  })

  return useQuery({
    queryKey: ['weather', weatherQueryKey],
    queryFn: async () => {
      const lat = unref(latRef)
      const lon = unref(lonRef)

      if (typeof lat !== 'number' || typeof lon !== 'number') {
        throw new Error('Latitude or Longitude is not a number for API call')
      }

      return await getCurrentWeather(lat!, lon!)
    },
    enabled: isQueryEnabled,
  })
}

export const useGetForecast = (
  latRef: Ref<number | null | undefined>,
  lonRef: Ref<number | null | undefined>,
) => {
  const forecastQueryKey = computed(() => {
    return ['forecast', unref(latRef), unref(lonRef)]
  })

  const isQueryEnabled = computed(() => {
    return typeof unref(latRef) === 'number' && typeof unref(lonRef) === 'number'
  })

  return useQuery({
    queryKey: ['forecast', forecastQueryKey],
    queryFn: async () => {
      const lat = unref(latRef)
      const lon = unref(lonRef)

      if (typeof lat !== 'number' || typeof lon !== 'number') {
        throw new Error('Latitude or Longitude is not a number for API call')
      }

      return await getForecast(lat!, lon!)
    },
    enabled: isQueryEnabled,
  })
}

export const useGet7DayHourlyForecast = (
  latRef: Ref<number | null | undefined>,
  lonRef: Ref<number | null | undefined>,
) => {
  const queryKey = computed(() => {
    return ['7dayhourly', unref(latRef), unref(lonRef)]
  })

  const isQueryEnabled = computed(() => {
    return typeof unref(latRef) === 'number' && typeof unref(lonRef) === 'number'
  })

  return useQuery({
    queryKey: ['7dayhourly', queryKey],
    queryFn: async () => {
      const lat = unref(latRef)
      const lon = unref(lonRef)

      if (typeof lat !== 'number' || typeof lon !== 'number') {
        throw new Error('Latitude or Longitude is not a number for API call')
      }

      return await get7DayHourlyForecast(lat!, lon!)
    },
    enabled: isQueryEnabled,
  })
}
