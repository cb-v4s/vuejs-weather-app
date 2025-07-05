import { owClient2Dot5 } from './client'
import { openWeatherApiKey } from '@/constants'
import { capitalize } from '@/utils/strings'

type CurrentWeatherResponse = {
  humidity: number
  wind: number
  temperature: number
  seaLevel: number
  clouds: number
  generalWeather: string
  weatherDescription: string
  timezone: number
  country: string
  city: string
}

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeatherResponse> => {
  if (!openWeatherApiKey) {
    throw new Error(
      'OpenWeather API key is not configured. Please check your environment variables.',
    )
  }

  const response = await owClient2Dot5.get(
    `weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`,
  )

  const { weather, main, wind, clouds, dt, sys, name } = response.data

  console.log(response.data)

  return {
    weatherDescription: capitalize(weather[0].description),
    generalWeather: weather[0].main,
    clouds: clouds.all,
    humidity: main.humidity,
    seaLevel: main.sea_level,
    wind: wind.speed,
    temperature: main.temp,
    timezone: dt,
    country: sys.country,
    city: name,
  }
}
