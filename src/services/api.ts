import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// Hooks de interceptores opcionales p/ refresh token
api.interceptors.response.use(
  res => res,
  async err => {
    // Manejo genérico de errores
    return Promise.reject(err);
  }
);
