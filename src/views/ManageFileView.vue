<script setup lang="ts">
import { ref } from 'vue'
import ConcreteZoneComponent from '../components/ConcreteZoneComponent.vue'

const files = ref([
  { id: 1, name: 'REG-Academic-Calendar-2567.pdf' },
  { id: 2, name: 'REG-Academic-Calendar-2568.pdf' },
  { id: 3, name: 'REG-Academic-Calendar-2567.pdf' },
  { id: 4, name: 'REG-Academic-Calendar-2567.pdf' },
  { id: 5, name: 'REG-Academic-Calendar-2567.pdf' },
  { id: 6, name: 'REG-Academic-Calendar-2567.pdf' },
  { id: 7, name: 'REG-Academic-Calendar-2567.pdf' }
])
const selectedFiles = ref<number[]>([])

const toggleFileSelection = (fileId: number) => {
  const index = selectedFiles.value.indexOf(fileId)
  if (index === -1) {
    selectedFiles.value.push(fileId)
  } else {
    selectedFiles.value.splice(index, 1)
  }
}

const isSelected = (fileId: number) => {
  return selectedFiles.value.includes(fileId)
}

const toggleSelectAll = () => {
  if (selectedFiles.value.length === files.value.length) {
    selectedFiles.value = []
  } else {
    selectedFiles.value = files.value.map((file) => file.id)
  }
}

const deleteSelectedFiles = () => {
  console.log('Deleting files with IDs:', selectedFiles.value)
  files.value = files.value.filter((file) => !selectedFiles.value.includes(file.id))
  selectedFiles.value = []
}
</script>

<template>
  <body class="manage-file-page">
    <ConcreteZoneComponent label="Manage File">
      <div class="file-table-container">
        <table class="file-table">
          <thead>
            <tr>
              <th class="file-id">ID</th>
              <th class="file-name">File name</th>
              <th class="file-select">
                <input
                  type="checkbox"
                  @click="toggleSelectAll"
                  :checked="selectedFiles.length === files.length && files.length > 0"
                />
                <span>Select all</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td class="file-id">{{ file.id }}</td>
              <td class="file-name">{{ file.name }}</td>
              <td class="file-select">
                <input
                  type="checkbox"
                  :value="file.id"
                  @change="toggleFileSelection(file.id)"
                  :checked="isSelected(file.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="delete-button-container">
          <button
            class="delete-button"
            @click="deleteSelectedFiles"
            :disabled="selectedFiles.length === 0"
          >
            Delete
          </button>
        </div>
      </div>
    </ConcreteZoneComponent>
  </body>
</template>

<style scoped>
.manage-file-page {
  background-color: #d9d9d9;
  padding: 20px;
}

.file-table-container {
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}

.file-table {
  width: 100%;
  border-collapse: collapse;
}

.file-table th,
.file-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.file-table th.file-id,
.file-table td.file-id {
  width: 10%;
}

.file-table th.file-name,
.file-table td.file-name {
  width: 70%;
}

.file-table th.file-select,
.file-table td.file-select {
  width: 20%;
  text-align: center;
}

.delete-button-container {
  text-align: center;
  margin-top: 20px;
}

.delete-button {
  background-color: #d32f2f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.delete-button:disabled {
  background-color: #f5b5b5;
  cursor: not-allowed;
}
</style>
