<script setup lang="ts">
import { Search } from '@/components/icons'
import { popularCities } from '@/constants'
import { useLocationStore } from '@/stores/location'
import type { Todo } from '@/types/main'
import { nextTick, onMounted, ref, watch } from 'vue'
import { searchQuery } from '@/api/geo'

const searchText = ref('')
const searchResults = ref<Todo[]>([])
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const DEBOUNCE_DELAY_MS = 500 // ms

const locationStore = useLocationStore()

const props = defineProps<{
  show: boolean
  title?: string
}>()

const emit = defineEmits(['close'])
const isVisible = ref(props.show)

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal
    if (newVal) {
      document.body.style.overflow = 'hidden' // Prevent scrolling background content
    } else {
      document.body.style.overflow = '' // Restore scrolling
    }
  },
  { immediate: true },
)

const closeModal = () => {
  emit('close')
}

const handleCityClick = (city: Todo) => {
  locationStore.setLocation(city.lat, city.lon)
  emit('close')
}

const performQuery = async (q: string) => {
  searchResults.value = await searchQuery(q)
}

watch(
  searchText,
  (newQuery) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    if (newQuery) {
      debounceTimer = setTimeout(() => {
        performQuery(newQuery)
      }, DEBOUNCE_DELAY_MS)
    } else {
      // If search text is cleared, immediately clear results and reset states
      searchResults.value = []
      // searchError.value = null
      // searchLoading.value = false
    }
  },
  { immediate: false },
)

const searchInput = ref<HTMLInputElement | null>(null)

watch(
  isVisible,
  (newVal) => {
    if (newVal === true) {
      nextTick(() => {
        if (searchInput.value) {
          searchInput.value.focus()
        }
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50 p-2">
        <div
          @click.self="closeModal"
          class="w-full h-full bg-black opacity-40 absolute top-0 left-0"
        ></div>
        <div
          class="z-50 border-2 border-primary bg-secondary text-primary-text rounded-lg shadow-xl py-2 max-w-md w-full transition-all duration-300 ease-in-out"
          @click.stop
        >
          <div class="pl-4 flex justify-between items-center mb-2">
            <Search class="w-5 h-5 mr-4" />
            <input
              ref="searchInput"
              class="w-full outline-none focus:outline-none text-base font-semibold"
              type="text"
              placeholder="Search city"
              autocomplete="off"
              autocorrect="off"
              v-model="searchText"
            />
            <button
              class="text-2xl leading-none cursor-pointer ml-auto mr-2 -mt-1 outline-none focus:outline-none"
              @click="closeModal"
            >
              &times;
            </button>
          </div>
          <div class="pl-2 border-t-2 border-primary">
            <p class="pl-2 text-sm text-secondary-text mt-4 mb-6">Suggestions</p>
            <ul>
              <template v-if="searchResults.length > 0">
                <li
                  v-for="location in searchResults"
                  key="location.country + location.name"
                  @click="handleCityClick(location)"
                  class="rounded-md cursor-pointer transition-colors duration-200 hover:bg-secondary-text p-2"
                >
                  {{ location.name }}, {{ location.state }}, {{ location.country }}
                </li>
              </template>
              <template v-else>
                <li
                  v-for="city in popularCities"
                  :key="city.name + city.country"
                  @click="handleCityClick(city)"
                  class="rounded-md cursor-pointer transition-colors duration-200 hover:bg-secondary-text p-2"
                >
                  <p class="text-primary-text text-sm">
                    {{ city.name }}, {{ city.state }}, {{ city.country }}
                  </p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: translateY(-20px) scale(0.95);
  opacity: 0; /* Ensures the container also fades with the backdrop */
}
</style>
