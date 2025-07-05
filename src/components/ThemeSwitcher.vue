<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const props = defineProps<{
  onThemeSelected: (mode: 'light' | 'dark') => void
}>()

const handleThemeSelection = (mode: 'light' | 'dark') => {
  props.onThemeSelected(mode)
}
</script>

<template>
  <div
    class="absolute top-12 right-0 border-2 bg-primary border-secondary-text rounded-lg flex flex-col w-20"
  >
    <span
      @click="handleThemeSelection('light')"
      class="outline-none focus:outline-none hover:bg-secondary-text cursor-pointer px-2 py-1 text-primary-text flex items-center text-sm"
    >
      <Sun class="w-4 h-4 text-primary-text mr-2" />
      light
    </span>
    <span
      @click="handleThemeSelection('dark')"
      class="outline-none focus:outline-none hover:bg-secondary-text cursor-pointer px-2 py-1 text-primary-text flex items-center text-sm"
    >
      <Moon class="w-4 h-4 text-primary-text mr-2" />
      dark
    </span>
  </div>
</template>
