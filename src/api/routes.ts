import axios from "axios";
import { axiosInstance } from "./requestConfig";
import {
  Route,
  ShortCollectionInterface,
} from "../entities/routes/model/routes";

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

  async getById(id: string) {
    try {
      const { data } = await api.get<Route>(`/routes/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  async create(userData: Route) {
    try {
      const { data } = await api.post<Route>(`/routes`, userData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  async update(userData: Route) {
    try {
      const { data } = await api.put<Route>(`/routes/${userData.id}`, userData);
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
