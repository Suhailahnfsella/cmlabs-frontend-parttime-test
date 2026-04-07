<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMealDetail, extractIngredients, type MealDetail } from '@/services/api'

const props = defineProps<{ id: string }>()

const meal = ref<MealDetail | null>(null)
const ingredients = ref<any[]>([])

onMounted(async () => {
  const data = await getMealDetail(props.id)
  meal.value = data
  ingredients.value = extractIngredients(data)
})
</script>

<template>
  <div v-if="meal" class="p-4">
    <img :src="meal.strMealThumb" class="w-full max-w-md" />
    <h1 class="text-2xl font-bold">{{ meal.strMeal }}</h1>

    <h2 class="mt-4 font-semibold">Ingredients</h2>
    <ul>
      <li v-for="(item, i) in ingredients" :key="i">
        {{ item.ingredient }} - {{ item.measure }}
      </li>
    </ul>

    <p class="mt-4">{{ meal.strInstructions }}</p>
  </div>
</template>