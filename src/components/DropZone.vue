<script setup lang="ts">
import { ref } from 'vue'
import FileService from '@/services/FileService'
import Swal, { type SweetAlertOptions } from 'sweetalert2'
import { useRouter } from 'vue-router'
const router = useRouter()
const isUrlUpload = ref(false)
const selectedFiles = ref<File[]>([])
const enteredUrls = ref<string[]>([])
const newUrl = ref<string>('')

const toggleUploadMethod = (method: boolean) => {
  isUrlUpload.value = method
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFiles.value.push(...Array.from(target.files))
  }
}

const handleUrlChange = (event: Event) => {
  newUrl.value = (event.target as HTMLInputElement).value.trim()
}

const addUrl = () => {
  if (newUrl.value) {
    enteredUrls.value.push(newUrl.value)
    newUrl.value = ''
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    selectedFiles.value.push(...Array.from(event.dataTransfer.files))
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const handleSubmit = () => {
  if (!isUrlUpload.value) {
    try {
      Swal.fire({
        title: 'Submit files',
        text: 'The file(s) will be upload into the system',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          console.log(result.value)
          FileService.uploadByBrowse(selectedFiles.value)
            .then(() => {
              console.log('Files submitted:', selectedFiles.value)
              selectedFiles.value = []
              Swal.fire('Upload Success', '', 'success')
              router.push({ name: 'manage' })
            })
            .catch((error) => {
              console.log(error.response.data)
              Swal.fire(error.response.data, '', 'error')
            })
        }
      })
    } catch (error) {
      console.log(selectedFiles.value)
      console.error('Error submitting files:', error)
    }
  } else if (isUrlUpload.value && enteredUrls.value.length > 0) {
    try {
      FileService.uploadByUrls(enteredUrls.value)
        .then(() => {
          console.log('URL submitted:', enteredUrls.value)
          enteredUrls.value = []
          Swal.fire('Upload Success', '', 'success')
          router.push({ name: 'manage' })
        })
        .catch((error) => {
          Swal.fire(error.response.data, '', 'error')
        })
      console.log('URLs submitted:', enteredUrls.value)
    } catch (error) {
      console.error('Error submitting URLs:', error)
    }
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const removeUrl = (index: number) => {
  enteredUrls.value.splice(index, 1)
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
          @click.prevent="toggleUploadMethod(true)"
        >
          Web Address (URL)
        </button>
      </div>
      <div v-if="!isUrlUpload">
        <div class="dropzone-container" @drop="handleDrop" @dragover="handleDragOver">
          <div class="dropzone">
            <font-awesome-icon icon="fa-cloud-arrow-up" class="text-4xl" />
            <span>
              Drag files here or
              <label for="dropzoneFile" class="text-blue-600 underline cursor-pointer">
                choose files
              </label>
            </span>
            <input
              type="file"
              id="dropzoneFile"
              class="hidden"
              multiple
              @change="handleFileChange"
            />
          </div>
        </div>
        <div class="mt-4 h-32 overflow-y-auto bg-white shadow-md rounded p-4 scrollable-container">
          <ul>
            <li
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="flex items-center justify-between space-x-2"
            >
              <div class="flex items-center space-x-2">
                <span class="text-green-600"
                  ><font-awesome-icon icon="fa-file" class="text-lg" /></span
                ><span>{{ file.name }}</span>
              </div>
              <button class="text-red-600" @click="removeFile(index)">❌</button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div class="url-container flex items-center">
          <input
            type="text"
            placeholder="Paste URL here:"
            class="border border-gray-300 p-2 flex-grow"
            v-model="newUrl"
            @input="handleUrlChange"
          />
          <button class="bg-rose-400 text-white py-2 px-4 mt-2 mb-2 ml-2 rounded" @click="addUrl">
            <font-awesome-icon icon="fa-cloud-arrow-up" class="text-lg" />
          </button>
        </div>
        <div class="mt-4 h-32 overflow-y-auto bg-white shadow-md rounded p-4 scrollable-container">
          <ul>
            <li
              v-for="(url, index) in enteredUrls"
              :key="index"
              class="flex items-center justify-between space-x-2"
            >
              <div class="flex items-center space-x-2">
                <span class="text-green-600"
                  ><font-awesome-icon icon="fa-link" class="text-lg" /></span
                ><span>{{ url }}</span>
              </div>
              <button class="text-red-600" @click="removeUrl(index)">❌</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-4 text-center">
      <button class="bg-green-600 text-white py-2 px-4 rounded" @click="handleSubmit">
        Submit
      </button>
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

.scrollable-container {
  max-height: 8rem;
  overflow-y: auto;
}

.scrollable-container ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.scrollable-container li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e5e5;
}
</style>
