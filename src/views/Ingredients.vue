<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getIngredients, type Ingredient } from '@/services/api'
import SearchBar from '@/components/molecules/SearchBar.vue'
import IngredientList from '@/components/organisms/IngredientList.vue'

const ingredients = ref<Ingredient[]>([])
const filtered = ref<Ingredient[]>([])

const handleSearch = (query: string) => {
  filtered.value = ingredients.value.filter(i =>
    i.strIngredient.toLowerCase().includes(query.toLowerCase())
  )
}

onMounted(async () => {
  const data = await getIngredients()
  ingredients.value = data
  filtered.value = data
})
</script>

<template>
  <div class="p-4">
    <SearchBar @search="handleSearch" />
    <IngredientList :ingredients="filtered" />
  </div>
</template>