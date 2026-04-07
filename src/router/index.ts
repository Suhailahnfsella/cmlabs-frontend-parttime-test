import { createRouter, createWebHistory } from 'vue-router'
import Ingredients from '../views/Ingredients.vue'
import IngredientDetail from '../views/IngredientDetail.vue'
import MealDetail from '../views/MealDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ingredients',
      component: Ingredients,
    },
    {
      path: '/ingredient/:name',
      name: 'ingredient-detail',
      component: IngredientDetail,
      props: true,
    },
    {
      path: '/meal/:id',
      name: 'meal-detail',
      component: MealDetail,
      props: true,
    },
  ],
})

export default router