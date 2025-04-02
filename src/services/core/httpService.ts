import type { AxiosRequestConfig } from 'axios';
import { apiService } from './apiService';

export interface ResponseData<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

class HttpService {
  public get<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResponseData<T>> {
    return apiService.get(url, { params, ...config });
  }

  public post<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResponseData<T>> {
    return apiService.post(url, params, config);
  }

  public put<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResponseData<T>> {
    return apiService.put(url, params, config);
  }

  public delete<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResponseData<T>> {
    return apiService.delete(url, { params, ...config });
  }

  public downloadFile<T>(url: string, config: AxiosRequestConfig = {}): Promise<ResponseData<T>> {
    return apiService.get(url, { ...config, responseType: 'blob' });
  }

  public uploadForm<T>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResponseData<T>> {
    return apiService.post(url, params, { ...config, headers: { 'Content-Type': 'multipart/form-data' } });
  }
}

export default new HttpService();
