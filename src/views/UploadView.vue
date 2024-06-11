<template>
  <div class="home">
    <h1>Upload</h1>
    <DropZone></DropZone>
    <span class="file-info">File: {{ dropzoneFile }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DropZone from '../components/DropZone.vue'

let dropzoneFile = ref('')
</script>
