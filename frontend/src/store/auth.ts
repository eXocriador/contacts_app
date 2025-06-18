// frontend/src/store/auth.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginRequest, RegisterRequest, AuthData } from "../types/api";
import { authApi } from "../api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setAuth: (data: AuthData) => void;
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

      setAuth: (data: AuthData) => {
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
        set((state) => ({
          ...state,
          user: { ...state.user, ...user }
        }));
      },

      login: async (data) => {
        set({ isLoading: true });
        const response = await authApi.login(data);
        get().setAuth(response.data);
        set({ isLoading: false });
      },

      register: async (data) => {
        set({ isLoading: true });
        const response = await authApi.register(data);
        get().setAuth(response.data);
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
        const response = await authApi.updateProfileWithPhoto(data);
        get().updateUser(response.data.user);
      },

      loginWithGoogle: async (code: string) => {
        set({ isLoading: true });
        const response = await authApi.loginWithGoogle(code);
        get().setAuth(response.data);
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
