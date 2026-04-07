<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMealsByIngredient, type Meal } from '@/services/api'
import SearchBar from '@/components/molecules/SearchBar.vue'
import MealList from '@/components/organisms/MealList.vue'

const props = defineProps<{ name: string }>()

const meals = ref<Meal[]>([])
const filtered = ref<Meal[]>([])

const handleSearch = (query: string) => {
  filtered.value = meals.value.filter(m =>
    m.strMeal.toLowerCase().includes(query.toLowerCase())
  )
}

onMounted(async () => {
  const data = await getMealsByIngredient(props.name)
  meals.value = data
  filtered.value = data
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-2">{{ props.name }}</h1>
    <SearchBar @search="handleSearch" />
    <MealList :meals="filtered" />
  </div>
</template>