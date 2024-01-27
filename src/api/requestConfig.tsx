import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const axiosInstance = (): AxiosInstance => {
  const baseURL = import.meta.env.VITE_DOMEN + ':' + import.meta.env.VITE_PORT; // ваш домен

  const headers = {
    'Content-Type': 'application/json',
    // Другие заголовки, если необходимо
  };

  const config: AxiosRequestConfig = {
    baseURL,
    headers,
  };

  return axios.create(config);
};
