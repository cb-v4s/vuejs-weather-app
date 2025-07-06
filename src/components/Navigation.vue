<script setup lang="ts">
import BtnSearch from './BtnSearch.vue'
import Modal from './ModalSearch.vue'

import { ref } from 'vue'

const isSearchModalOpen = ref(false)

const openSearchModal = () => {
  isSearchModalOpen.value = true
}

const closeSearchModal = () => {
  isSearchModalOpen.value = false
}
</script>

<template>
  <div class="w-full py-4 px-6">
    <div class="float-right flex relative">
      <BtnSearch @open-search-modal="openSearchModal" />
    </div>
  </div>

  <Modal :show="isSearchModalOpen" @close="closeSearchModal" />
</template>
