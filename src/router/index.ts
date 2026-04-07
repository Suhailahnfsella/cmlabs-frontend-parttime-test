import { createRouter, createWebHistory } from 'vue-router'
import Ingredients from '../views/Ingredients.vue'
import IngredientDetail from '../views/IngredientDetail.vue'
import MealDetail from '../views/MealDetail.vue'
import ComingSoon from '../components/molecules/ComingSoon.vue'

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
    {
      path: '/home',
      name: 'home',
      component: ComingSoon,
      meta: {
        title: 'Home - Coming Soon',
        description: 'Home page is coming soon!',
      },
    },
    {
      path: '/foods',
      name: 'foods',
      component: ComingSoon,
      meta: {
        title: 'Foods - Coming Soon',
        description: 'Foods page is coming soon!',
      },
    },
    {
      path: '/local',
      name: 'localculinary',
      component: ComingSoon,
      meta: {
        title: 'Local Culinary - Coming Soon',
        description: 'Local Culinary page is coming soon!',
      },
    },
  ],
})

export default router
