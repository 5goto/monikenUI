import axios from 'axios';
import { axiosInstance } from './requestConfig';

export interface CollectionInterface {
  id: string;
  name: string;
  description: string;
}

const api = axiosInstance();

class CollectionAxiosRequest {
  async getAll() {
    try {
      const { data } = await api.get<CollectionInterface[]>(`/collections`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  async create(userData: CollectionInterface) {
    try {
      console.log(axiosInstance());

      const { data } = await api.post<CollectionInterface>(
        `/collections`,
        userData
      );
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

export const collectionApi = new CollectionAxiosRequest();
