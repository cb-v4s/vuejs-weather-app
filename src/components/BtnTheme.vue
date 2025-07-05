<script setup lang="ts">
import { Moon, Sun } from '@/components/icons'

const props = defineProps<{
  themeMode: 'light' | 'dark'
}>()
</script>

<template>
  <button
    class="outline-none focus:outline-none border-2 border-secondary-text hover:bg-secondary-text rounded-lg px-4 py-2 cursor-pointer"
  >
    <Moon v-if="props.themeMode === 'dark'" class="h-4 w-4 text-primary-text" />
    <Sun v-else class="h-4 w-4 text-primary-text" />
  </button>
</template>
