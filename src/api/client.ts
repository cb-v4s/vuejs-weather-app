import axios from 'axios'

export const owClient2Dot5 = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    'Content-Type': 'application/json',
  },
})
