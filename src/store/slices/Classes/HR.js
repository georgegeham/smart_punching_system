/* eslint-disable no-useless-catch */
import api from "@/api/config";
export default class HR {
  async create(data) {
    try {
      const response = await api.post(`/register`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async login(data) {
    try {
      const response = await api.post(`/login`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      const response = await api.post(`/logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
