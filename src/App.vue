<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import Layout from './components/Layout.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen min-w-screen bg-secondary flex flex-col px-4 xl:px-60 crt">
    <Navigation />
    <Layout />
    <Footer />
  </div>
</template>
