<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const variantClasses = {
  primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
  secondary: 'bg-orange-100 text-orange-700 hover:bg-orange-200 focus:ring-orange-500',
  outline: 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
  ghost: 'text-orange-600 hover:bg-orange-50 focus:ring-orange-500'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const emit = defineEmits<{
  click: [MouseEvent]
}>()
</script>

<template>
  <button
    :disabled="props.disabled || props.loading"
    :class="[
      'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[props.variant],
      sizeClasses[props.size],
      props.loading && 'cursor-wait'
    ]"
    @click="emit('click', $event)"
  >
    <div class="flex items-center justify-center gap-2">
      <svg v-if="props.loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <slot />
    </div>
  </button>
</template>