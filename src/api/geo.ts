import { openWeatherApiKey } from '@/constants'
import { openWeatherClientGeo } from './client'

type SearchQueryResponse = {
  name: string
  lat: number
  lon: number
  country: string
  state: string
}

export const searchQuery = async (q: string): Promise<SearchQueryResponse[]> => {
  const defaultLimit = 5
  const response = await openWeatherClientGeo.get(
    `direct?q=${q}&limit=${defaultLimit}&appid=${openWeatherApiKey}`,
  )

  return response.data
}
