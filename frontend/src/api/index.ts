// frontend/src/api/index.ts

import axios, { AxiosError } from "axios";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (response) => response, // Directly return successful responses
  async (error: AxiosError) => {
    const originalRequest = error.config as {
      url?: string;
      _retry?: boolean;
      headers?: Record<string, string>;
    };

    // Якщо отримали 401 на /auth/refresh — одразу логаут і стоп
    if (
      error.response?.status === 401 &&
      originalRequest.url?.includes("/auth/refresh")
    ) {
      useAuthStore.getState().logout();
      toast.error("Your session has expired. Please log in again.");
      return Promise.reject(error);
    }

    // Якщо 401 і ще не пробували refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Якщо refresh вже йде — чекаємо його завершення
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await useAuthStore.getState().refresh();
        isRefreshing = false;
        const newToken = useAuthStore.getState().token;
        if (newToken && originalRequest.headers) {
          onRefreshed(newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        useAuthStore.getState().logout();
        toast.error("Your session has expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    }

    // For all other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default api;
