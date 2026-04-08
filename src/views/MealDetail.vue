<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMealDetail, extractIngredients, type MealDetail } from '@/services/api'
import Breadcrumb from '@/components/molecules/Breadcrumb.vue'
import LoadingSpinner from '@/components/molecules/LoadingSpinner.vue'

const router = useRouter()
const props = defineProps<{ id: string }>()

const meal = ref<MealDetail | null>(null)
const ingredients = ref<any[]>([])
const loading = ref(true)

const getYoutubeEmbedUrl = (url: string | null): string | undefined => {
  if (!url) return undefined
  const videoId = url.split('v=')[1]?.split('&')[0]
  return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined
}

onMounted(async () => {
  try {
    const data = await getMealDetail(props.id)
    meal.value = data
    ingredients.value = extractIngredients(data)

    if (data?.strMeal) {
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          mealName: data.strMeal
        }
      })
    }
  } catch (error) {
    console.error('Failed to load meal detail:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen animate-fade-in">
    <div class="container-custom py-8 md:py-12">
      <div v-if="loading" class="py-12">
        <LoadingSpinner size="lg" />
      </div>

      <div v-else-if="meal" class="max-w-5xl mx-auto">
        <Breadcrumb />

        <div class="text-center mb-8 animate-slide-up">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {{ meal.strMeal }}
          </h1>

          <div class="flex flex-wrap justify-center gap-3 mb-6">
            <span class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              {{ meal.strCategory }}
            </span>
            <span class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ meal.strArea }}
            </span>
          </div>
        </div>

        <div class="mb-8 rounded-2xl overflow-hidden shadow-xl">
          <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-64 md:h-96 object-cover" />
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Ingredients
          </h2>
          <div class="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
              <div v-for="(item, i) in ingredients" :key="i"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 transition-colors duration-150">
                <span class="text-gray-700 font-medium">{{ item.ingredient }}</span>
                <span class="text-orange-600 text-sm bg-orange-50 px-2 py-1 rounded-full">{{ item.measure }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Instructions
          </h2>
          <div class="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <div class="prose max-w-none">
              <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                {{ meal.strInstructions }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="meal.strYoutube" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            Video Tutorial
          </h2>
          <div class="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
            <iframe class="absolute top-0 left-0 w-full h-full" :src="getYoutubeEmbedUrl(meal.strYoutube)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>

        <div v-if="meal.strSource" class="text-center pt-4 border-t border-orange-100">
          <a :href="meal.strSource" target="_blank"
            class="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Source Recipe
          </a>
        </div>
      </div>

      <div v-else class="text-center py-12 animate-fade-in">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-500 text-lg">Meal not found</p>
        <router-link to="/" class="inline-block mt-4 text-orange-600 hover:text-orange-700">
          Back to Ingredients
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose {
  line-height: 1.8;
}

.whitespace-pre-line {
  white-space: pre-line;
}
</style>