<script setup lang="ts">
import type { Ingredient } from '@/services/api'

defineProps<{
  ingredients: Ingredient[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="item in ingredients"
      :key="item.idIngredient"
      class="p-4 border rounded cursor-pointer hover:bg-gray-100"
      @click="$router.push(`/ingredient/${item.strIngredient}`)"
    >
      {{ item.strIngredient }}
    </div>
  </div>
</template>