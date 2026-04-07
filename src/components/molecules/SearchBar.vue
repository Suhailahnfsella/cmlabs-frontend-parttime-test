<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from '../atoms/BaseInput.vue'
import BaseButton from '../atoms/BaseButton.vue'

const emit = defineEmits<{
  search: [query: string]
  clear: []
}>()

const search = ref('')
let debounceTimer: ReturnType<typeof setTimeout>

const handleSearch = (val: string) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', val)
  }, 300)
}

watch(search, (val) => {
  handleSearch(val)
})

const clearSearch = () => {
  search.value = ''
  emit('clear')
  emit('search', '')
}
</script>

<template>
  <div class="relative">
    <div class="relative">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <BaseInput v-model="search" placeholder="Search ingredients..." class="pl-10 pr-8" />
      <div class="absolute -right-1 top-1/2 -translate-y-1/2 flex items-center gap-0">
        <button v-if="search" @click="clearSearch"
          class="p-1.5 rounded-full text-gray-400 hover:text-orange-500 transition-colors duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>