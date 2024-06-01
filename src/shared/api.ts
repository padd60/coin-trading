import axios from 'axios';
import { AxiosClient } from './model';

export const apiClient: AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.response.use((res) => res.data);
