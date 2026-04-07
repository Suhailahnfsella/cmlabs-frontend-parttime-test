import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export interface Ingredient {
  idIngredient: string
  strIngredient: string
  strDescription: string | null
  strThumb: string
  strType: string | null
}

export interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export interface MealDetail {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube: string | null
  [key: string]: any
}

export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await api.get('/list.php?i=list')
  return res.data.meals
}

export const getMealsByIngredient = async (name: string): Promise<Meal[]> => {
  const res = await api.get(`/filter.php?i=${name}`)
  return res.data.meals
}

export const getMealDetail = async (id: string): Promise<MealDetail> => {
  const res = await api.get(`/lookup.php?i=${id}`)
  return res.data.meals[0]
}

export const extractIngredients = (meal: MealDetail) => {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure })
    }
  }

  return ingredients
}

export default api
