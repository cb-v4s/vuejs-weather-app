<script setup lang="ts">
import { Search } from '@/components/icons'
</script>

<template>
  <button
    class="outline-none focus:outline-none border-2 border-secondary-text hover:bg-secondary-text rounded-lg px-4 py-2 cursor-pointer flex"
  >
    <Search class="w-4 h-4 text-primary-text mr-2" />
    <p class="font-semibold text-sm text-primary-text">Search location</p>
  </button>
</template>
