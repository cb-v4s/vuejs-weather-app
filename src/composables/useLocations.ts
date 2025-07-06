import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref, unref } from 'vue'
import { searchQuery } from '@/api/geo'

export const useGetWeather = (q: Ref<string | null | undefined>) => {
  const queryKey = computed(() => {
    return ['q', unref(q)]
  })

  const isQueryEnabled = computed(() => {
    return typeof unref(q) === 'string'
  })

  return useQuery({
    queryKey: ['q', queryKey],
    queryFn: async () => {
      const query = unref(q)

      if (typeof query !== 'string') {
        throw new Error('Query is not a string for API call')
      }

      return await searchQuery(query!)
    },
    enabled: isQueryEnabled,
  })
}
