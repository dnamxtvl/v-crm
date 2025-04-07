import { message } from 'antd';
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { CALL_AXIOS_TIMEOUT } from '@/constants/config/app';
import Helper from '@/utils/helper';
import { HttpStatusCode } from 'axios';
import Router from 'next/router';
import { store } from '@/store/store';
import { ROUTE_APP } from '@/constants/config/route';

export const apiService = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  baseURL: process.env.BACKEND_URL,
  timeout: CALL_AXIOS_TIMEOUT,
});

interface ErrorResponse {
  errors: {
    code: string;
  },
  message: string
}

interface ErrorValidate {
  errors: {
    code: Array<string>;
  },
  message: string
}

const handleError = async (error: AxiosError): Promise<AxiosError> => {
  const statusCode = error.response?.status || HttpStatusCode.InternalServerError;
  let messageError: Array<string> = [];
  
  if (statusCode === HttpStatusCode.Unauthorized || statusCode === HttpStatusCode.GatewayTimeout) {
    Helper.logOutWhenTokenExpired();
    message.error(error.message || 'error');

    Router.push(ROUTE_APP.AUTH.LOGIN);
  }

  const errorRes: ErrorResponse | ErrorValidate | null = error.response?.data as ErrorResponse | ErrorValidate || null;
  if (!errorRes || Object(errorRes).length === 0) {
    messageError.push(error.message);
  } else {
    const code = errorRes.errors.code;
    if (Array.isArray(code)) {
      code.forEach(async (item) => {
        messageError.push(await Helper.getErrorMessage(item));
      })
    } else {
      messageError.push(await Helper.getErrorMessage(code));
    }
  }
  
  message.error(messageError.slice() || 'error');
  return Promise.reject(error);
};

apiService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
}, handleError);

apiService.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
}, handleError);
