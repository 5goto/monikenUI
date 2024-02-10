import axios from 'axios';
import { axiosInstance } from './requestConfig';

export interface ShortCollectionInterface {
  id: string;
  name: string;
  endpoint: string;
}

const api = axiosInstance();

class RoutesAxiosRequest {
  async getAll() {
    try {
      const { data } = await api.get<ShortCollectionInterface[]>(`/routes`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  async delete(id: string) {
    // origin api provides delete by name
    try {
      console.log(axiosInstance());

      const { data } = await api.delete(`/routes/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw error;
      }
    }
  }
}

export const routesApi = new RoutesAxiosRequest();
