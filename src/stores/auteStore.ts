import { ref } from 'vue'
import router from '@/router';
// Define the reactive state
const isLoggedIn = ref(false)
const user = ref<{ firstname_EN: string; lastname_EN: string } | null>(null)

// Function to update the login state
export const setLoginState = (loginStatus: boolean, userInfo: any) => {
  isLoggedIn.value = loginStatus
  user.value = userInfo
}

// Function to log out
export const logout = () => {

  isLoggedIn.value = false
  user.value = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_name')
  router.push({ name: 'home' }).catch((err) => {
    console.error('Navigation error:', err)
  })
}

// Export the state to be used in other components
export { isLoggedIn, user }
