import type { AxiosResponse } from 'axios'
import type { Database_File } from '@/type'
import apiClient from './AxiosClient'

export default {
  getFiles(page: Number, limit: Number): Promise<AxiosResponse<Database_File[]>> {
    return apiClient.get<Database_File[]>('/get_files?_limit=' + limit + '&_page=' + page)
  },
  deleteByIds(_id: String[]): Promise<AxiosResponse> {
    return apiClient.post('/delete_by_id', { _id })
  },
  uploadByBrowse(files: File[]): Promise<AxiosResponse> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
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
