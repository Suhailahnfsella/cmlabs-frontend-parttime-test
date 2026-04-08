<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getMealsByIngredient, type Meal } from '@/services/api'
import MealGrid from '@/components/organisms/MealGrid.vue'
import Pagination from '@/components/molecules/Pagination.vue'

const props = defineProps<{ name: string }>()

const meals = ref<Meal[]>([])
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = ref<number | string>(12)
const searchQuery = ref('')

const filteredMeals = computed(() => {
  if (!searchQuery.value) return meals.value
  return meals.value.filter(meal =>
    meal.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalItems = computed(() => filteredMeals.value.length)
const totalPages = computed(() => {
  if (itemsPerPage.value === 'All') return 1
  return Math.ceil(totalItems.value / (itemsPerPage.value as number))
})

const paginatedMeals = computed(() => {
  const items = filteredMeals.value
  if (itemsPerPage.value === 'All') {
    return items
  }
  const start = (currentPage.value - 1) * (itemsPerPage.value as number)
  const end = start + (itemsPerPage.value as number)
  return items.slice(start, end)
})

const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const handleClear = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const changeItemsPerPage = (newItemsPerPage: number | string) => {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1
}

onMounted(async () => {
  try {
    const data = await getMealsByIngredient(props.name)
    meals.value = data || []
  } catch (error) {
    console.error('Failed to load meals:', error)
    meals.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen animate-fade-in">
    <div class="container-custom py-8 md:py-12">
      <MealGrid :meals="paginatedMeals" :loading="loading" :total-items="totalItems" :ingredient-name="name" />

      <Pagination v-if="!loading && totalItems > 0" :current-page="currentPage" :total-pages="totalPages"
        :total-items="totalItems" :items-per-page="itemsPerPage" @update:page="goToPage" @next="nextPage"
        @prev="prevPage" @update:items-per-page="changeItemsPerPage" />
    </div>
  </div>
</template>