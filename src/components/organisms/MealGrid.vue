<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Meal } from '@/services/api'
import SearchBar from '@/components/molecules/SearchBar.vue'
import MealList from '@/components/organisms/MealList.vue'
import LoadingSpinner from '@/components/molecules/LoadingSpinner.vue'
import Breadcrumb from '@/components/molecules/Breadcrumb.vue'

const props = defineProps<{
    meals: Meal[]
    loading?: boolean
    totalItems?: number
    ingredientName?: string
}>()

const searchQuery = ref('')

const filteredMeals = computed(() => {
    if (!searchQuery.value) return props.meals
    return props.meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
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
        <Breadcrumb />

        <div class="text-center mb-8 animate-slide-up">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                <span class="text-gradient">{{ ingredientName || 'Meals' }}</span>
            </h1>

            <p class="text-gray-500">
                {{ ingredientName ? `Discover delicious recipes with ${ingredientName}` : 'Explore our collection of delicious meals' }}
            </p>
            <p v-if="totalItems && !loading" class="text-sm text-orange-600 mt-2">
                {{ totalItems }} {{ ingredientName ? 'recipes' : 'meals' }} available
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
                Found {{ filteredMeals.length }} meal{{ filteredMeals.length !== 1 ? 's' : '' }}
            </div>
            <MealList :meals="filteredMeals" />
        </div>
    </div>
</template>