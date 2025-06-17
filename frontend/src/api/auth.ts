// frontend/src/api/auth.ts

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  UpdatePasswordRequest,
  User
} from "../types/api";
import api from "./index"; // Імпортуємо центральний екземпляр

class AuthApi {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    localStorage.setItem("token", response.data.data.accessToken);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    localStorage.setItem("token", response.data.data.accessToken);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  }

  async refresh(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/refresh");
    localStorage.setItem("token", response.data.data.accessToken);
    return response.data;
  }

  // Метод для оновлення з фото (використовує FormData)
  async updateProfileWithPhoto(
    data: FormData
  ): Promise<{ data: { user: User } }> {
    const response = await api.put<{ data: { user: User } }>(
      "/auth/profile",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  }

  // Метод для оновлення тільки текстових даних (використовує JSON)
  async updateProfileJSON(
    data: UpdateProfileRequest
  ): Promise<{ data: { user: User } }> {
    const response = await api.put<{ data: { user: User } }>(
      "/auth/profile",
      data
    );
    return response.data;
  }

  async getGoogleOAuthUrl(): Promise<string> {
    const response = await api.get<{ data: { url: string } }>("/auth/google");
    return response.data.data.url;
  }

  async loginWithGoogle(code: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/google/callback", {
      code
    });
    localStorage.setItem("token", response.data.data.accessToken);
    return response.data;
  }

  async updatePassword(data: UpdatePasswordRequest): Promise<void> {
    await api.patch("/auth/profile", data);
  }
}

export const authApi = new AuthApi();
