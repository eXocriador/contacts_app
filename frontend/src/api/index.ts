// frontend/src/api/index.ts

import axios from "axios";
import { useAuthStore } from "../store/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Створюємо єдиний екземпляр axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Інтерсептор для додавання токена до кожного запиту
api.interceptors.request.use((config) => {
  // Використовуємо токен зі стору, а не з localStorage, для консистентності
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Інтерсептор для оновлення токена у разі помилки 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Викликаємо метод refresh зі стору
        await useAuthStore.getState().refresh();

        // Оновлюємо заголовок з новим токеном
        originalRequest.headers.Authorization = `Bearer ${
          useAuthStore.getState().token
        }`;
        return api(originalRequest);
      } catch (refreshError) {
        // Якщо оновлення не вдалося, виходимо з системи
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
