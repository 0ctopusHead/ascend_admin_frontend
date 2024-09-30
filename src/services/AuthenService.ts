import type { AxiosResponse } from 'axios'
import apiClient from './AxiosClient'

export interface UserInfo {
  firstname_EN: string;
  lastname_EN: string;
  // Add more fields as necessary based on the user info structure
}

export default {
  // Get access token from the OAuth callback
  getAccessToken(params: URLSearchParams): Promise<AxiosResponse<any>> {
    return apiClient.post('/callback', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  
  getStoredAccessToken() {
    return localStorage.getItem('access_token')
  },
  
  // Fetch user information using the access token
  fetchUserInfo(accessToken: string): Promise<AxiosResponse<UserInfo>> {
    if (!accessToken) {
      console.error('Access token is missing')
      return Promise.reject('Access token is missing')
    }

    return apiClient.get<UserInfo>('/user_info', {
      headers: {
        Authorization: `Bearer ${accessToken}` // Ensure the access token is sent in the header
      }
    }).catch(error => {
      console.error('Error fetching user info:', error)
      throw error
    })
  },

  // Redirect user to login (OAuth login)
  login(): Promise<AxiosResponse<any>> {
    return apiClient.get('/login').catch(error => {
      console.error('Error during login process:', error)
      throw error
    })
  }
}