<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">
          Meals Explorer
        </h1>
      </div>
    </header>

    <main class="max-w-6xl mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>