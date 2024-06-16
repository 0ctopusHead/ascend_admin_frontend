import type { AxiosResponse } from 'axios'
import type { File } from '@/type'
import apiClient from './AxiosClient'

export default {
  getFiles(): Promise<AxiosResponse<File[]>> {
    return apiClient.get<File[]>('/get_files')
  },
  deleteByIds(_id: String[]): Promise<AxiosResponse> {
    return apiClient.post('/delete_by_id', { _id })
  }
}
