<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  type?: 'text' | 'search' | 'email' | 'password'
  error?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  error: '',
  label: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="w-full">
    <label v-if="props.label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ props.label }}
    </label>
    <input
      :type="props.type"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="props.placeholder"
      :class="[
        'w-full px-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2',
        props.error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
          : 'border-gray-200 focus:border-orange-400 focus:ring-orange-100 hover:border-orange-300'
      ]"
    />
    <p v-if="props.error" class="mt-1 text-sm text-red-500">{{ props.error }}</p>
  </div>
</template>