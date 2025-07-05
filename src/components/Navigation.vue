<script setup lang="ts">
import { ref } from 'vue'
import BtnSearch from './BtnSearch.vue'
import BtnTheme from './BtnTheme.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useClickOutside } from '@/composables/useClickOutside'

const displayThemeSwitch = ref(false)
const defaultTheme = 'dark'
const themeMode = ref<'light' | 'dark'>(defaultTheme)

const selectThemeMode = (mode: 'light' | 'dark') => {
  themeMode.value = mode
  displayThemeSwitch.value = false
}

const openThemeSwitch = () => {
  displayThemeSwitch.value = !displayThemeSwitch.value
}

const btnThemeRef = ref<any | null>(null)
const themeSwitcherRef = ref<any | null>(null)

useClickOutside(
  [btnThemeRef, themeSwitcherRef], // Pass an array of all refs that define the "inside" area
  () => (displayThemeSwitch.value = false),
  displayThemeSwitch, // This reactive ref determines if the click-outside listener is active
)
</script>

<template>
  <div class="w-full py-4 px-6">
    <div class="float-right flex relative">
      <BtnSearch />
      <span class="mr-2"></span>
      <BtnTheme :theme-mode="themeMode" @click="openThemeSwitch" ref="btnThemeRef" />
      <ThemeSwitcher
        :on-theme-selected="selectThemeMode"
        v-if="displayThemeSwitch"
        ref="themeSwitcherRef"
      />
    </div>
  </div>
</template>
