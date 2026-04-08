<script setup lang="ts">
import type { Meal } from '@/services/api'
import BaseCard from '../atoms/BaseCard.vue'

defineProps<{
  meals: Meal[]
}>()

const getImageUrl = (thumb: string) => {
  return thumb || 'https://via.placeholder.com/400x300?text=No+Image'
}
</script>

<template>
  <div v-if="meals.length === 0" class="text-center py-12 animate-fade-in">
    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
    <p class="text-gray-500 text-lg">No meals found</p>
    <p class="text-gray-400 text-sm mt-1">Try searching with different keywords</p>
  </div>

  <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in">
    <BaseCard v-for="meal in meals" :key="meal.idMeal" hoverable clickable padding="none" @click="$router.push({
      path: `/meal/${meal.idMeal}`,
      query: {
        ingredient: $route.params.name,
        mealName: meal.strMeal
      }
    })" class="group overflow-hidden relative">
      <div class="relative">
        <img :src="getImageUrl(meal.strMealThumb)" :alt="meal.strMeal"
          class="w-full h-48 object-cover transition-all duration-300 group-hover:scale-105 brightness-75 group-hover:brightness-100"
          @error="(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'" />

        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent"></div>

        <div class="absolute bottom-0 left-0 right-0 p-4 text-center">
          <h3 class="font-semibold text-white text-sm md:text-base line-clamp-2 drop-shadow-md">
            {{ meal.strMeal }}
          </h3>
          <div class="w-8 h-0.5 bg-orange-400 mt-2 transition-all duration-300 group-hover:w-12 mx-auto"></div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>