// frontend/src/store/auth.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  AuthResponse as BackendAuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest
} from "../types/api";
import { authApi } from "../api/auth";
import axios from "axios";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setAuth: (data: { user: User; accessToken: string }) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<void>;
  loginWithGoogle: (code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (data) => {
        set({
          user: data.user,
          token: data.accessToken,
          isAuthenticated: true,
          error: null
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
      },

      updateUser: (user: User) => {
        set((state) => ({ ...state, user }));
      },

      login: async (data) => {
        set({ isLoading: true });
        const response = await authApi.login(data);
        get().setAuth({
          user: response.data.user,
          accessToken: response.data.accessToken
        });
        set({ isLoading: false });
      },

      register: async (data) => {
        set({ isLoading: true });
        const response = await authApi.register(data);
        get().setAuth({
          user: response.data.user,
          accessToken: response.data.accessToken
        });
        set({ isLoading: false });
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error("Logout failed but clearing session anyway.", error);
        } finally {
          get().clearAuth();
        }
      },

      refresh: async () => {
        try {
          const response = await authApi.refresh();
          set({
            token: response.data.accessToken,
            isAuthenticated: true
          });
        } catch (error) {
          get().clearAuth();
          throw error;
        }
      },

      updateProfile: async (data: FormData) => {
        // This function now expects FormData
        const response = await authApi.updateProfileWithPhoto(data);
        get().updateUser(response.data);
      },

      loginWithGoogle: async (code: string) => {
        set({ isLoading: true });
        const response = await authApi.loginWithGoogle(code);
        get().setAuth({
          user: response.data.user,
          accessToken: response.data.accessToken
        });
        set({ isLoading: false });
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Wrapper for authenticated API calls
export const authProtectedApiCall = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        await useAuthStore.getState().refresh();
        // Retry the original call after successful refresh
        return await apiCall();
      } catch (refreshError) {
        useAuthStore.getState().logout();
        throw refreshError;
      }
    }
    throw error;
  }
};
