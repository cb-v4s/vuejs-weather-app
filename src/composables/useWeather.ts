import { useQuery } from '@tanstack/vue-query'
import { getCurrentWeather } from '@/api/data'
import { type Ref, unref } from 'vue'

export const useGetWeather = (
  latRef: Ref<number | null | undefined>,
  lonRef: Ref<number | null | undefined>,
) => {
  return useQuery({
    queryKey: ['weather', unref(latRef), unref(lonRef)],
    queryFn: async () => {
      const lat = unref(latRef)
      const lon = unref(lonRef)

      return await getCurrentWeather(lat!, lon!)
    },
    enabled: typeof unref(latRef) === 'number' && typeof unref(lonRef) === 'number',
  })
}
