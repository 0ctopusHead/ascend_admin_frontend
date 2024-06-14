<template>
  <!-- Nav bar Start -->
  <nav class="bg-white border-b border-gray-200 shadow-md dark:bg-gray-90">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
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
            <a href="#" class="block py-2 px-3 text-xl">
              <font-awesome-icon icon="fa-right-from-bracket" />
            </a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 text-xl" aria-current="page">
              <font-awesome-icon icon="fa-user" /> Admin
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Nav bar ended -->

  <!-- Drawer Start -->
  <div class="flex">
    <input type="checkbox" id="drawer-toggle" class="relative sr-only peer" />
    <label
      for="drawer-toggle"
      class="absolute top-1/2 left-0 inline-block p-4 rounded-lg transition-all duration-500 peer-checked:rotate-180 peer-checked:left-64 hover:bg-gray-100 hover:cursor-pointer"
    >
      <div class="w-6 h-1 mb-3 rotate-45 bg-black rounded-lg"></div>
      <div class="w-6 h-1 -rotate-45 bg-black rounded-lg"></div>
    </label>
    <div
      class="fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0"
    >
      <div class="flex flex-col items-center justify-center h-full">
        <ul class="w-full space-y-2 font-large">
          <li>
            <a
              href="#"
              class="pb-2 flex items-center p-2 text-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:border-4 focus:border-r-red-600 focus:bg-gray-100"
            >
              <font-awesome-icon icon="fa-house" class="text-lg" />
              <span class="ms-3">Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="pb-2 flex items-center p-2 text-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:border-4 focus:border-r-red-600 focus:bg-gray-100"
            >
              <font-awesome-icon icon="fa-folder-open" class="text-lg" />
              <span class="ms-3">Upload</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="pb-2 flex items-center p-2 text-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:border-4 focus:border-r-red-600 focus:bg-gray-100"
            >
              <font-awesome-icon icon="fa-folder-tree" class="text-lg" />
              <span class="ms-3">File Management</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- Overlay -->
    <label
      for="drawer-toggle"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 hidden peer-checked:block"
    ></label>
    <!-- Main Content Wrapper -->
    <div
      class="flex-1 transition-opacity duration-500 peer-checked:opacity-50 pointer-events-none peer-checked:pointer-events-auto"
    >
      <RouterView />
    </div>
  </div>
</template>
<style scoped>
.peer-checked:opacity-50 {
  opacity: 0.5;
}

.peer-checked:block {
  display: block;
}

.pointer-events-none {
  pointer-events: none;
}

.pointer-events-auto {
  pointer-events: auto;
}
</style>
