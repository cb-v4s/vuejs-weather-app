import axios from 'axios'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export const openWeatherClientData = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: defaultHeaders,
})

export const openWeatherClientGeo = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/',
  headers: defaultHeaders,
})

export const meteoClient = axios.create({
  baseURL: 'https://api.open-meteo.com/v1/',
  headers: defaultHeaders,
})
