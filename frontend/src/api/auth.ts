// frontend/src/api/auth.ts

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  User
} from "../types/api";
import api from "./index";

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refresh: async (): Promise<{ data: { accessToken: string } }> => {
    const response = await api.post<{ data: { accessToken: string } }>("/auth/refresh");
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<{ data: User }>("/auth/current");
    return response.data.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<{ data: { user: User } }> => {
    const formData = new FormData();

    if (data.name) formData.append('name', data.name);
    if (data.email) formData.append('email', data.email);
    if (data.currentPassword) formData.append('currentPassword', data.currentPassword);
    if (data.newPassword) formData.append('newPassword', data.newPassword);
    if (data.photo) formData.append('photo', data.photo);

    const response = await api.patch<{ data: { user: User } }>(
      "/auth/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  },

  updateProfileWithPhoto: async (formData: FormData): Promise<{ data: { user: User } }> => {
    const response = await api.patch<{ data: { user: User } }>(
      "/auth/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  },

  getGoogleOAuthUrl: async (): Promise<{ data: { url: string } }> => {
    const response = await api.get<{ data: { url: string } }>("/auth/google/url");
    return response.data;
  },

  loginWithGoogle: async (code: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/google", { code });
    return response.data;
  }
};
