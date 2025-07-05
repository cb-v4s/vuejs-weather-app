import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

const queryClient = new QueryClient({
  // Optional: Configure default options for all your queries and mutations here
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
      refetchOnWindowFocus: true,
      retry: 3,
    },
    mutations: {},
  },
})

app.use(VueQueryPlugin, {
  queryClient,
})

app.mount('#app')
