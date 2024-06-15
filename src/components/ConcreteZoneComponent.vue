<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="pt-10">
    <div class="inset-0 flex flex-col justify-center items-center">
      <div class="zone-card bg-white p-4 shadow-lg rounded-lg">
        <h1 v-if="label" class="pl-12 text-2xl font-semibold text-gray-500 dark:text-white">
          {{ label }}
        </h1>

        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.zone-card {
  width: 75%;
  max-height: 75%;
}
</style>
