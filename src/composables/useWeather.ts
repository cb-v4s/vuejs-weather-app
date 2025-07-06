import { useQuery } from '@tanstack/vue-query'
import { getCurrentWeather } from '@/api/data'
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
