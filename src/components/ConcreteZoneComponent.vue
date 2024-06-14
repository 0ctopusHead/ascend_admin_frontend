<script lang="ts" setup>
import type { PropType } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="relative h-screen">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="bg-white w-5/6 h-5/6 p-4 shadow-lg rounded-lg">
        <h1 v-if="label">{{ label }}</h1>
      </div>
    </div>
  </div>
</template>
