import type { AxiosResponse } from 'axios'
import type { Database_File } from '@/type'
import apiClient from './AxiosClient'

export default {
  getFiles(): Promise<AxiosResponse<Database_File[]>> {
    return apiClient.get<Database_File[]>('/get_files')
  },
  deleteByIds(_id: String[]): Promise<AxiosResponse> {
    return apiClient.post('/delete_by_id', { _id })
  },
  uploadByBrowse(files: File[]): Promise<AxiosResponse> {
    const formData = new FormData()
    files.forEach((file, index) => {
      const uniqueFileName = index + `${Date.now()}_${file.name}` // Append timestamp to ensure uniqueness
      formData.append('files', file, uniqueFileName)
    })
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadByUrls(urls: string[]): Promise<AxiosResponse> {
    return apiClient.post('/upload_by_url', { urls })
  }
}
