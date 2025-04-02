import { message } from 'antd';
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

export const apiService = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  baseURL: process.env.BACKEND_URL,
  timeout: 10 * 1000,
});

const handleError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401 || error.response?.status === 504) {
    //clearAuthCache();
    location.href = '/login';
  }
  message.error(error.message || 'error');
  return Promise.reject(error);
};

apiService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = '';
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
}, handleError);

apiService.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
}, handleError);
