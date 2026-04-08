<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getIngredients, type Ingredient } from '@/services/api'
import IngredientGrid from '@/components/organisms/IngredientGrid.vue'
import Pagination from '@/components/molecules/Pagination.vue'

const ingredients = ref<Ingredient[]>([])
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = ref<number | string>(12)

const totalItems = computed(() => ingredients.value.length)
const totalPages = computed(() => {
  if (itemsPerPage.value === 'All') return 1
  return Math.ceil(totalItems.value / (itemsPerPage.value as number))
})

const paginatedIngredients = computed(() => {
  if (itemsPerPage.value === 'All') {
    return ingredients.value
  }
  const start = (currentPage.value - 1) * (itemsPerPage.value as number)
  const end = start + (itemsPerPage.value as number)
  return ingredients.value.slice(start, end)
})

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
    const data = await getIngredients()
    ingredients.value = data
  } catch (error) {
    console.error('Failed to load ingredients:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen animate-fade-in">
    <div class="container-custom py-8 md:py-12">
      <IngredientGrid :ingredients="paginatedIngredients" :loading="loading" :total-items="totalItems" />

      <Pagination v-if="!loading && totalItems > 0" :current-page="currentPage" :total-pages="totalPages"
        :total-items="totalItems" :items-per-page="Number(itemsPerPage)" @update:page="goToPage" @next="nextPage"
        @prev="prevPage" @update:items-per-page="changeItemsPerPage" />
    </div>
  </div>
</template>