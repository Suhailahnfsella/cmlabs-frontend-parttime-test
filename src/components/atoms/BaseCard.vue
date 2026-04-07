<script setup lang="ts">
interface Props {
  hoverable?: boolean
  clickable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  clickable: false,
  padding: 'md'
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
}

const emit = defineEmits<{
  click: [MouseEvent]
}>()
</script>

<template>
  <div
    :class="[
      'bg-white rounded-xl shadow-sm border border-orange-100/50 transition-all duration-200',
      paddingClasses[padding],
      props.hoverable && 'hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5',
      props.clickable && 'cursor-pointer'
    ]"
    @click="props.clickable ? emit('click', $event) : undefined"
  >
    <slot />
  </div>
</template>