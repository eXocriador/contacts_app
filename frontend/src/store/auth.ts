import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  AuthResponse as BackendAuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest
} from "../types/api"; // Перейменовано AuthResponse
import { authApi } from "../api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setAuth: (data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  }) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>; // Без аргументів
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  loginWithGoogle: (code: string) => Promise<void>; // Додано
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (data: {
        user: User;
        accessToken: string;
        refreshToken?: string;
      }) => {
        set({
          user: data.user,
          token: data.accessToken,
          refreshToken: data.refreshToken || null,
          isAuthenticated: true,
          error: null
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null
        });
      },

      updateUser: (user: User) => {
        set({ user });
      },

      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response: BackendAuthResponse = await authApi.login(data); // Використовуємо BackendAuthResponse
          get().setAuth({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to login";
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response: BackendAuthResponse = await authApi.register(data); // Використовуємо BackendAuthResponse
          get().setAuth({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to register";
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authApi.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          get().clearAuth();
          set({ isLoading: false });
        }
      },

      refresh: async () => {
        set({ isLoading: true, error: null });
        try {
          const response: BackendAuthResponse = await authApi.refresh(); // Без аргументів
          get().setAuth({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          });
        } catch (error) {
          get().clearAuth();
          const message =
            error instanceof Error ? error.message : "Failed to refresh token";
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateProfile: async (data: UpdateProfileRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.updateProfile(data as any); // Приводимо до any для formData
          set({ user: response.user });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Failed to update profile";
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      loginWithGoogle: async (code: string) => {
        // Новий метод
        set({ isLoading: true, error: null });
        try {
          const response: BackendAuthResponse = await authApi.loginWithGoogle(
            code
          );
          get().setAuth({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Failed to login with Google";
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
      // Включити refreshToken у збереження стану, якщо він використовується для перевірки автентифікації при завантаженні сторінки
      // getStorage: () => localStorage,
      // include: ['user', 'isAuthenticated', 'token', 'refreshToken']
    }
  )
);
