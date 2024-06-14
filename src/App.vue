<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-md dark:bg-gray-90">
    <div class="flex flex-wrap items-center justify-between mx-8 p-4">
      <a class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/src/assets/ascend.svg" class="h-10" alt="AscendEDU Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >AscendEDU</span
        >
      </a>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a href="#" class="block py-2 px-3 text-xl"
              ><font-awesome-icon icon="fa-right-from-bracket"
            /></a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 text-xl" aria-current="page"
              ><font-awesome-icon icon="fa-user" /> Admin
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink :to="{ name: 'upload' }">Upload</RouterLink>
  </nav> -->
  <RouterView />
</template>
