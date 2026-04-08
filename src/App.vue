<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', path: '/home' },
  { name: 'Foods', path: '/foods' },
  { name: 'Ingredients', path: '/' },
  { name: 'Local Culinary', path: '/local' }
]

const isActive = (path: string) => {
  if (path === '/ingredients') return true
  return route.path === path
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <div class="min-h-screen">
    <nav class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-orange-100">
      <div class="container-custom mx-auto">
        <div class="flex justify-between items-center h-16 md:h-20">
          <router-link to="/" class="flex items-center space-x-3 group">
            <h1
              class="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              MealApp
            </h1>
          </router-link>

          <div class="hidden md:flex items-center space-x-1">
            <router-link v-for="item in navigation" :key="item.name" :to="item.path"
              class="relative px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 group">
              <span class="relative z-10">{{ item.name }}</span>
              <span :class="[
                'absolute bottom-0 left-3 right-3 h-0.5 bg-orange-500 transition-transform duration-300 origin-left',
                isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              ]"></span>
            </router-link>
          </div>

          <button @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:text-orange-600 transition-all duration-200 cursor-pointer">
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <transition enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4">
          <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-orange-100">
            <div class="flex flex-col space-y-1">
              <router-link v-for="item in navigation" :key="item.name" :to="item.path" :class="[
                'relative px-4 py-3 rounded-lg transition-all duration-200',
                isActive(item.path)
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-600'
              ]">
                <div class="flex items-center justify-between">
                  <span>{{ item.name }}</span>
                  <span v-if="isActive(item.path)" class="w-1 h-6 bg-orange-500 rounded-full"></span>
                </div>
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <main class="container-custom mx-auto py-8 md:py-12">
      <RouterView />
    </main>

    <footer class="bg-white/60 backdrop-blur-sm mt-5 mb-10">
      <div class="container-custom mx-auto py-8">
        <div class="text-center">
          <p class="text-gray-600 text-sm">
            © 2026 MealApp. All rights reserved.
          </p>
          <p class="text-gray-400 text-xs mt-2">
            Discover amazing recipes from around the world
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  transition: all 0.2s ease;
}
</style>