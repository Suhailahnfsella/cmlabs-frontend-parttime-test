<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'orange' | 'white'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'orange'
})

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
}

const colorClasses = {
  orange: 'border-orange-500',
  white: 'border-white'
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      :class="[
        sizeClasses[size],
        colorClasses[color],
        'animate-spin rounded-full border-4 border-t-transparent'
      ]"
    />
  </div>
</template>