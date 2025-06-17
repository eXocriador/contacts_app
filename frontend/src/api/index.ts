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

// 👇 ADDED a response interceptor for 401 errors
api.interceptors.response.use(
  (response) => response, // Directly return successful responses
  async (error: AxiosError) => {
    const originalRequest = error.config as any; // 'any' to add a custom property

    // Check if it's a 401 error and we haven't already retried the request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've retried this request

      try {
        const { refresh, token } = useAuthStore.getState();
        await refresh(); // Attempt to refresh the token

        // After refresh, the new token will be in the store.
        // The request interceptor will automatically add it to the header.
        if (useAuthStore.getState().token !== token) {
          return api(originalRequest); // Retry the original request with the new token
        }
      } catch (refreshError) {
        // If refresh fails, log the user out
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
