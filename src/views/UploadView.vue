<script setup lang="ts">
import { ref } from 'vue'
import DropZone from '../components/DropZone.vue'
import ConcreteZoneComponent from '../components/ConcreteZoneComponent.vue'
</script>

<template>
  <body>
    <ConcreteZoneComponent label="Upload File">
      <DropZone></DropZone>
    </ConcreteZoneComponent>
  </body>
</template>

<style scoped>
body {
  background-color: #d9d9d9;
}
</style>
