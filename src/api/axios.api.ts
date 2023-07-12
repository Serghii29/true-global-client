import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helper';

export const instance = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    Authorization: 'Bearer ' + getTokenFromLocalStorage(),
  },
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    // no need to run `response.json()` data is already prepared
    return response.data;
  },

  async post<T>(url: string, data: any) {
    const response = await instance.post<T>(url, data);

    return response.data;
  },

  async patch<T>(url: string, data: any) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete<T>(url: string) {
    const response = await instance.delete<T>(url);

    return response.data;
  },
};
