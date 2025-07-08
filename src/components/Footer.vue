<script setup lang="ts">
import { githubUrl } from '@/constants'
</script>

<template>
  <div className="w-full text-sm py-4 text-center mt-auto text-primary-text">
    <span>
      The source code for this site can be found on
      <a className="font-semibold hover:underline" :href="githubUrl" target="_blank"> Github</a>
    </span>
  </div>
</template>
