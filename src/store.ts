import { reactive } from 'vue'

// Define your global store using `reactive` for reactivity
const GStore = reactive({
  user: null as { firstname_EN: string; lastname_EN: string } | null, // Example user object
  accessToken: null as string | null, // Example access token

  // Methods to update the state
  setUser(user: { firstname_EN: string; lastname_EN: string }) {
    this.user = user
  },
  setAccessToken(token: string) {
    this.accessToken = token
  },
  clearUser() {
    this.user = null
    this.accessToken = null
  }
})

export default GStore