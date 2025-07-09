<script setup lang="ts">
import { Github } from '@/components/icons'
import { githubUrl } from '@/constants'
</script>

<template>
  <a
    target="_blank"
    :href="githubUrl"
    class="outline-none focus:outline-none bg-[#F2F5F2] rounded-lg px-4 py-2 cursor-pointer flex font-semibold text-sm text-secondary-text hover:text-primary-text items-center transition-colors duration-100"
  >
    <Github class="w-4 h-4 text-secondary-text mr-2 mt-[1px]" />
    <span>Support</span>
  </a>
</template>
