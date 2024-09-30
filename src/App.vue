<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AuthenService from '@/services/AuthenService'
import { isLoggedIn, setLoginState, logout } from '@/stores/auteStore'
console.log(isLoggedIn)
const user = ref<{ firstname_EN: string; lastname_EN: string } | null>(null)
const router = useRouter()
const route = useRoute()

const isActiveRoute = (routeName: string) => {
  return route.name === routeName
}

const handleAuthCode = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const code = urlSearchParams.get('code')
  console.log('Manually Extracted OAuth Code from URL:', code)

  if (code) {
    try {
      const params = new URLSearchParams()
      params.append('code', code)

      // Send the code as x-www-form-urlencoded
      const response = await AuthenService.getAccessToken(params)
      console.log('Backend Response (Access Token):', response.data)

      const accessToken = response.data.access_token
      if (accessToken) {
        localStorage.setItem('access_token', accessToken)
        console.log('Access Token Stored:', accessToken)

        const userInfoResponse = await AuthenService.fetchUserInfo(accessToken)
        user.value = userInfoResponse.data
        isLoggedIn.value = true
        setLoginState(true, userInfoResponse.data)

        router.replace({ query: {} })
      }
    } catch (error) {
      console.error('Error handling OAuth code:', error)
    }
  } else {
    console.error('Authorization code is missing in the URL.')
  }
}

const login = () => {
  AuthenService.login()
    .then((response: any) => {
      console.log('Redirecting to OAuth:', response.data) // Ensure the OAuth URL is correct
      window.location.href = response.data // Redirect to OAuth provider
    })
    .catch((error) => {
      console.error('Error during login flow:', error)
    })
}

// Logout function
const handleLogout = () => {
  logout()
}

// Check authentication when component is mounted
onMounted(async () => {
  await handleAuthCode() // Ensure we process the OAuth code first
})
</script>

<
<template>
  <!-- Top Navigation Bar -->
  <nav class="bg-white border-b border-gray-200 shadow-lg fixed w-full z-30 top-0 left-0">
    <div class="flex items-center justify-between mx-auto p-4">
      <!-- Logo -->
      <a class="flex items-center space-x-3">
        <img src="/src/assets/ascend.svg" class="h-10" alt="AscendEDU Logo" />
        <span class="text-2xl font-semibold text-gray-800">AscendEDU</span>
      </a>

      <!-- User Info & Login/Logout -->
      <div class="flex items-center space-x-6">
        <!-- User Information -->
        <span v-if="isLoggedIn" class="text-xl text-gray-800">
          <font-awesome-icon icon="fa-user" /> {{ user?.firstname_EN }} {{ user?.lastname_EN }}
        </span>

        <!-- Login/Logout Button -->
        <a
          v-if="isLoggedIn"
          href="#"
          @click="handleLogout"
          class="text-xl text-gray-800 hover:text-blue-600 transition-colors"
        >
          <font-awesome-icon icon="fa-right-from-bracket" /> Logout
        </a>
        <a
          v-else
          href="#"
          @click="login"
          class="text-xl text-gray-800 hover:text-blue-600 transition-colors mr-4"
          style="margin-left: -10px"
        >
          <font-awesome-icon icon="fa-right-to-bracket" /> Login
        </a>
      </div>
    </div>
  </nav>

  <!-- Conditional Sidebar (only show when not logged in) -->
  <div v-if="isLoggedIn" class="flex">
    <!-- Sidebar Navigation -->
    <div
      class="fixed top-0 left-0 h-full bg-gray-900 shadow-lg w-16 mt-16 z-20 transition-transform transform"
    >
      <div class="flex flex-col items-center space-y-8 mt-10">
        <!-- Home Link -->
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            class="group relative flex items-center justify-center w-full p-4"
            :class="isActiveRoute('home') ? 'bg-blue-600' : 'hover:bg-gray-700'"
          >
            <font-awesome-icon icon="fa-house" class="text-white text-2xl" />
            <span
              class="absolute left-20 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded-lg py-1 px-2"
            >
              Home
            </span>
          </RouterLink>
        </li>

        <!-- Upload Link -->
        <li>
          <RouterLink
            :to="{ name: 'upload' }"
            class="group relative flex items-center justify-center w-full p-4"
            :class="isActiveRoute('upload') ? 'bg-blue-600' : 'hover:bg-gray-700'"
          >
            <font-awesome-icon icon="fa-folder-open" class="text-white text-2xl" />
            <span
              class="absolute left-20 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded-lg py-1 px-2"
            >
              Upload
            </span>
          </RouterLink>
        </li>

        <!-- Manage Link -->
        <li>
          <RouterLink
            :to="{ name: 'manage' }"
            class="group relative flex items-center justify-center w-full p-4"
            :class="isActiveRoute('manage') ? 'bg-blue-600' : 'hover:bg-gray-700'"
          >
            <font-awesome-icon icon="fa-folder-tree" class="text-white text-2xl" />
            <span
              class="absolute left-20 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded-lg py-1 px-2"
            >
              Manage
            </span>
          </RouterLink>
        </li>
      </div>
    </div>

    <!-- Main Content Wrapper -->
    <div class="flex-1 ml-16 mt-16 p-4 bg-gray-100 min-h-screen transition-all duration-300">
      <RouterView />
    </div>
  </div>

  <!-- Main Content Wrapper (when logged in, without sidebar) -->
  <div v-else class="flex-1 mt-16 bg-gray-100 min-h-screen transition-all duration-300">
    <RouterView />
  </div>
</template>

<style scoped>
/* Styling for fixed top bar */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

/* Spacing adjustment for main content to avoid overlapping with the fixed top nav */
.main-content {
  margin-top: 64px; /* Adjust this if the height of your top nav changes */
}

/* Hover effect for text visibility */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.hover\:bg-gray-700:hover {
  background-color: #374151;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}
</style>
