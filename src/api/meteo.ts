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
    // It's good to include units if you use them for display
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    weather_code: string
    uv_index_max: string
  }
  // You might also want to include timezone, latitude, longitude from the top level
  // latitude: number;
  // longitude: number;
  // timezone: string;
}

export const getForecast = async (latitude: number, longitude: number): Promise<Forecast> => {
  const days = 7
  const response = await meteoClient.get(
    `forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,uv_index_max&timezone=auto&forecast_days=${days}`,
  )

  const { daily, daily_units } = response.data

  console.log('Full Forecast API Response:', response.data) // Log full data for debugging

  return {
    daily, // Return the entire daily object
    daily_units, // Return the daily_units object
  }
}
