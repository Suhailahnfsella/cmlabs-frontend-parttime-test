<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '../atoms/BaseButton.vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number | 'All'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:page': [page: number]
  'next': []
  'prev': []
  'update:items-per-page': [value: number | 'All']
}>()

const itemsPerPageOptions: (number | 'All')[] = [12, 24, 36, 48, 'All']

const startItem = computed(() => {
  if (props.itemsPerPage === 'All') return 1
  return (props.currentPage - 1) * (props.itemsPerPage as number) + 1
})

const endItem = computed(() => {
  if (props.itemsPerPage === 'All') return props.totalItems
  return Math.min(props.currentPage * (props.itemsPerPage as number), props.totalItems)
})

const getPageNumbers = () => {
  if (props.itemsPerPage === 'All') return [1]

  const delta = 2
  const range: number[] = []
  const rangeWithDots: (number | string)[] = []
  let l: number = 0

  for (let i = 1; i <= props.totalPages; i++) {
    if (i === 1 || i === props.totalPages || (i >= props.currentPage - delta && i <= props.currentPage + delta)) {
      range.push(i)
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
}

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page !== props.currentPage) {
    emit('update:page', page)
  }
}

const isOpen = ref(false)
</script>

<template>
  <div class="mt-8 md:mt-12 space-y-4">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <span class="font-medium">Show:</span>
        <div class="relative">
          <button @click="isOpen = !isOpen" type="button"
            class="flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all duration-200 cursor-pointer">
            <span class="font-medium pr-2">{{ props.itemsPerPage }}</span>
            <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="isOpen"
            class="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
            <div v-for="option in itemsPerPageOptions" :key="option"
              @click="emit('update:items-per-page', option); isOpen = false" :class="[
                'px-4 py-2 cursor-pointer transition-colors',
                props.itemsPerPage === option ? 'text-orange-600 font-semibold' : 'hover:bg-orange-50 hover:text-orange-600'
              ]">
              {{ option }}
            </div>
          </div>
        </div>
        <span class="text-gray-500">items per page</span>
      </div>

      <div class="text-sm text-gray-600">
        Showing <span class="font-semibold text-orange-600">{{ startItem }}</span>
        to <span class="font-semibold text-orange-600">{{ endItem }}</span>
        of <span class="font-semibold text-gray-800">{{ totalItems }}</span> ingredients
      </div>
    </div>

    <div class="flex justify-center">
      <div class="flex items-center gap-1 md:gap-2">
        <BaseButton variant="outline" size="sm" :disabled="currentPage === 1" @click="emit('prev')"
          class="!px-3 cursor-pointer">
          <svg class="w-4 h-4 my-[4.2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </BaseButton>

        <div class="flex items-center gap-1">
          <button v-for="(page, idx) in getPageNumbers()" :key="idx" :class="[
            'min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all duration-200',
            page === currentPage
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
              : page === '...'
                ? 'cursor-default text-gray-400'
                : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600 cursor-pointer'
          ]" :disabled="page === '...'" @click="goToPage(page)">
            {{ page }}
          </button>
        </div>

        <BaseButton variant="outline" size="sm" :disabled="currentPage === totalPages" @click="emit('next')"
          class="!px-3 cursor-pointer">
          <svg class="w-4 h-4 my-[4.2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </BaseButton>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <div class="flex items-center gap-2 text-sm">
        <span class="text-gray-600">Jump to page:</span>
        <input type="number" :value="currentPage" @input="(e) => {
          const val = parseInt((e.target as HTMLInputElement).value)
          if (!isNaN(val) && val >= 1 && val <= totalPages) {
            goToPage(val)
          }
        }" min="1" :max="totalPages"
          class="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
        <span class="text-gray-600">of {{ totalPages }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 0.5;
}
</style>