<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ingredient } from '@/services/api'
import SearchBar from '@/components/molecules/SearchBar.vue'
import IngredientList from '@/components/organisms/IngredientList.vue'
import LoadingSpinner from '@/components/molecules/LoadingSpinner.vue'

const props = defineProps<{
  ingredients: Ingredient[]
  loading?: boolean
  totalItems?: number
}>()

const searchQuery = ref('')

const filteredIngredients = computed(() => {
  if (!searchQuery.value) return props.ingredients
  return props.ingredients.filter(ingredient =>
    ingredient.strIngredient.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleClear = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center mb-8 animate-slide-up">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Explore <span class="text-gradient">Ingredients</span>
      </h1>
      
      <p class="text-gray-500">Discover delicious recipes by ingredients</p>
      <p v-if="totalItems && !loading" class="text-sm text-orange-600 mt-2">
        {{ totalItems }} ingredients available
      </p>
    </div>

    <div class="max-w-md mx-auto mb-8">
      <SearchBar @search="handleSearch" @clear="handleClear" />
    </div>

    <div v-if="loading" class="py-12">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else>
      <div class="mb-4 text-sm text-gray-500">
        Found {{ filteredIngredients.length }} ingredient{{ filteredIngredients.length !== 1 ? 's' : '' }}
      </div>
      <IngredientList :ingredients="filteredIngredients" />
    </div>
  </div>
</template>