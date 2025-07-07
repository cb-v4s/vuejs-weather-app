export type Todo = any
export type PopularCity = {
  name: string
  country: string
  state: string
  lat: number
  lon: number
}

export type CurrentWeatherResponse = {
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
