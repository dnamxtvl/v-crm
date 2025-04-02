import { message } from 'antd';
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { CALL_AXIOS_TIMEOUT } from '@/constants/config/app';
import Helper from '@/utils/helper';
import { HttpStatusCode } from 'axios';
import Router from 'next/router';

export const apiService = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  baseURL: process.env.BACKEND_URL,
  timeout: CALL_AXIOS_TIMEOUT,
});

const handleError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === HttpStatusCode.Unauthorized || error.response?.status === HttpStatusCode.GatewayTimeout) {
    Helper.logOutWhenTokenExpired();
    Router.push('/login');
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
