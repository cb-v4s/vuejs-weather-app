<script setup lang="ts">
import { Search } from '@/components/icons'

const emit = defineEmits(['open-search-modal'])

const handleClick = () => {
  emit('open-search-modal')
}
</script>

<template>
  <button
    @click="handleClick"
    class="outline-none focus:outline-none border-2 border-secondary-text hover:bg-secondary-text rounded-lg px-4 py-2 cursor-pointer flex transition-colors duration-100"
  >
    <Search class="w-4 h-4 text-primary-text mr-2 mt-[1px]" />
    <p class="font-semibold text-sm text-primary-text">Search location</p>
  </button>
</template>
