<script setup lang="ts">
import type { Ingredient } from '@/services/api'
import BaseCard from '../atoms/BaseCard.vue'

defineProps<{
  ingredients: Ingredient[]
}>()

const getImageUrl = (thumb: string) => {
  return thumb || 'https://via.placeholder.com/80x80?text=No+Image'
}
</script>

<template>
  <div v-if="ingredients.length === 0" class="text-center py-12 animate-fade-in">
    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
    <p class="text-gray-500 text-lg">No ingredients found</p>
    <p class="text-gray-400 text-sm mt-1">Try searching with different keywords</p>
  </div>

  <div v-else
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in">
    <BaseCard v-for="item in ingredients" :key="item.idIngredient" hoverable clickable
      @click="$router.push(`/ingredient/${item.strIngredient}`)" class="group">
      <div class="flex flex-col items-center text-center">
        <img :src="getImageUrl(item.strThumb)" :alt="item.strIngredient"
          class="w-20 h-20 mb-3 transition-transform duration-300 group-hover:scale-110"
          @error="(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=No+Image'" />

        <h3 class="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
          {{ item.strIngredient }}
        </h3>

        <div class="w-8 h-0.5 bg-orange-300 mt-2 transition-all duration-300 group-hover:w-12"></div>
      </div>
    </BaseCard>
  </div>
</template>