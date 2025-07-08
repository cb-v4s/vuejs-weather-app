import { openWeatherClientData } from './client'
import { openWeatherApiKey } from '@/constants'
import type { CurrentWeatherResponse } from '@/types/main'
import { capitalize } from '@/utils/strings'

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeatherResponse> => {
  if (!openWeatherApiKey) {
    throw new Error(
      'OpenWeather API key is not configured. Please check your environment variables.',
    )
  }

  const response = await openWeatherClientData.get(
    `weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`,
  )

  const { weather, main, wind, clouds, sys, name, timezone } = response.data

  return {
    weatherDescription: capitalize(weather[0].description),
    generalWeather: weather[0].main,
    clouds: clouds.all,
    humidity: main.humidity,
    seaLevel: main.sea_level,
    wind: wind.speed,
    temperature: main.temp,
    timezone,
    country: sys.country,
    city: name,
  }
}
