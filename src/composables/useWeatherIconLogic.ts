import { CloudDrizzle, CloudRain, Snowflake, Sun, Cloudy, CloudFog } from '@/components/icons'

const getWeatherIconComponent = (weatherMain: string) => {
  switch (weatherMain) {
    case 'Drizzle':
      return CloudDrizzle
    case 'Rain':
      return CloudRain
    case 'Snow':
      return Snowflake
    case 'Clear':
      return Sun
    case 'Clouds':
      return Cloudy
    case 'Mist':
      return CloudFog
    default:
      return Sun
  }
}

export const useMainWeatherIcon = (currentWeatherCondition: string) => {
  if (currentWeatherCondition) {
    return getWeatherIconComponent(currentWeatherCondition)
  }

  return Sun
}
