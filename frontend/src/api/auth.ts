import axios from "axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  User,
  UpdatePasswordRequest
} from "../types/api";
import { useAuthStore } from "../store/auth";

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await useAuthStore.getState().refresh();

        const token = useAuthStore.getState().token;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
class AuthApi {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  }

  async refresh(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/refresh");
    localStorage.setItem("token", response.data.token);
    return response.data;
  }

  async updateProfile(data: FormData): Promise<AuthResponse> {
    const response = await api.put<AuthResponse>("/auth/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  }

  async getGoogleOAuthUrl(): Promise<string> {
    const response = await api.get<{ url: string }>("/auth/google");
    return response.data.url;
  }

  async loginWithGoogle(code: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/google", { code });
    localStorage.setItem("token", response.data.token); // Аналогічно
    return response.data;
  }

  async updatePassword(data: UpdatePasswordRequest): Promise<void> {
    await api.put("/auth/password", data);
  }
}

export const authApi = new AuthApi();
