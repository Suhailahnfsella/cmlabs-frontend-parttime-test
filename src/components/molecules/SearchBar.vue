<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from '../atoms/BaseInput.vue'

const emit = defineEmits(['search'])
const search = ref('')

watch(search, (val) => emit('search', val))
</script>

<template>
  <BaseInput v-model="search" placeholder="Search..." />
</template>