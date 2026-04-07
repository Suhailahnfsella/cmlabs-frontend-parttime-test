<script setup lang="ts">
import type { Meal } from '@/services/api'

defineProps<{
  meals: Meal[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="meal in meals"
      :key="meal.idMeal"
      class="cursor-pointer"
      @click="$router.push(`/meal/${meal.idMeal}`)"
    >
      <img :src="meal.strMealThumb" class="rounded" />
      <p>{{ meal.strMeal }}</p>
    </div>
  </div>
</template>