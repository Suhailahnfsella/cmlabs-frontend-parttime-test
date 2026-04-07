<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Coming Soon',
  description: 'This page is currently under development. Stay tuned for amazing content!',
  icon: '🚀'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
    <div class="relative mb-8">
      <div class="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center animate-pulse-slow">
        <span class="text-6xl">{{ icon }}</span>
      </div>
      <div class="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
        <span class="text-white text-xs">⭐</span>
      </div>
    </div>

    <h1 class="h-18 text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent mb-4">
      {{ title }}
    </h1>

    <div class="w-20 h-1 bg-orange-300 rounded-full mb-6"></div>

    <p class="text-gray-600 text-lg md:text-xl max-w-md mb-8">
      {{ description }}
    </p>

    <router-link
      to="/"
      class="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
    >
      Back to Ingredients
    </router-link>

    <div class="mt-12 w-64">
      <div class="flex justify-between text-sm text-gray-500 mb-2">
        <span>Development Progress</span>
        <span>75%</span>
      </div>
      <div class="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
        <div class="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full animate-progress"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
    width: 75%;
  }
}

.animate-progress {
  animation: progress 1.5s ease-out forwards;
}

.animate-pulse-slow {
  animation: pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.98);
  }
}
</style>