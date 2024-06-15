<script setup lang="ts">
import { ref } from 'vue'

const isUrlUpload = ref(false)

const toggleUploadMethod = (method: boolean) => {
  isUrlUpload.value = method
  console.log(isUrlUpload.value)
}
</script>

<template>
  <div class="container mx-auto mt-10">
    <div class="bg-white shadow-md rounded p-8 w-full max-w-lg mx-auto">
      <div class="flex justify-between mb-6">
        <button
          :class="{ 'bg-rose-500 text-white': !isUrlUpload, 'bg-gray-200 text-black': isUrlUpload }"
          class="w-1/2 py-2"
          @click.prevent="toggleUploadMethod(false)"
        >
          Browse
        </button>
        <button
          :class="{ 'bg-rose-500 text-white': isUrlUpload, 'bg-gray-200 text-black': !isUrlUpload }"
          class="w-1/2 py-2"
          @click="toggleUploadMethod(true)"
        >
          Web Address (URL)
        </button>
      </div>
      <div v-if="!isUrlUpload" class="dropzone-container">
        <div class="dropzone">
          <font-awesome-icon icon="fa-cloud-arrow-up" class="text-4xl" />
          <span
            >Drag file here or
            <label for="dropzoneFile" class="text-blue-600 underline cursor-pointer"
              >choose a file</label
            ></span
          >
          <input type="file" id="dropzoneFile" class="hidden" />
        </div>
      </div>
      <div v-else class="url-container">
        <input
          type="text"
          placeholder="Paste an URL here:"
          class="border border-gray-300 p-2 w-full"
        />
      </div>
    </div>
    <div class="mt-4">
      <ul>
        <li
          v-for="file in ['REG-Academic-Calendar-2567.pdf', 'REG-Academic-Calendar-2568.pdf']"
          :key="file"
          class="flex items-center space-x-2"
        >
          <span class="text-green-600">✔️</span><span>{{ file }}</span>
        </li>
      </ul>
    </div>
    <div class="mt-4 text-center">
      <button class="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.dropzone-container,
.url-container {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #bdbdbd;
  background-color: #f3f3f3;
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
}

label {
  cursor: pointer;
}

input[type='text'] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
}

button {
  cursor: pointer;
}
</style>
