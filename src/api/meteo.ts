import { meteoClient } from './client'

interface DailyForecastData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
  uv_index_max: number[]
  // Add other daily variables if you fetch them
}

interface Forecast {
  daily: DailyForecastData
  daily_units: {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    weather_code: string
    uv_index_max: string
  }
}

type HourlyForecast = {
  times: string[]
  temperatures: number[]
}

export const getForecast = async (latitude: number, longitude: number): Promise<Forecast> => {
  const days = 7
  const response = await meteoClient.get(
    `forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,uv_index_max&timezone=auto&forecast_days=${days}`,
  )

  const { daily, daily_units } = response.data

  return {
    daily, // Return the entire daily object
    daily_units, // Return the daily_units object
  }
}

export const get7DayHourlyForecast = async (
  latitude: number,
  longitude: number,
): Promise<HourlyForecast> => {
  const days = 7
  const hourlyQuery = ['uv_index', 'temperature_2m']

  const response = await meteoClient.get(
    `forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyQuery.join()}&forecast_days=${days}`,
  )

  const { hourly } = response.data

  return {
    times: hourly.time,
    temperatures: hourly.temperature_2m,
  }
}
