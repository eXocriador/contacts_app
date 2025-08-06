// frontend/src/store/auth.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthData
} from "../types/api";
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
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(data);
          get().setAuth(response.data);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          get().setAuth(response.data);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          // Log error but don't throw - we want to clear local state anyway
          if (process.env.NODE_ENV === "development") {
            console.error(
              "Server-side logout failed, clearing client session anyway.",
              error
            );
          }
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
          // Fetch and update user after refreshing token
          const user = await authApi.getCurrentUser();
          set({ user });
        } catch (error) {
          get().clearAuth();
          throw error;
        }
      },

      updateProfile: async (data: FormData) => {
        set({ error: null });
        try {
          const response = await authApi.updateProfileWithPhoto(data);
          get().updateUser(response.data.user);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Profile update failed";
          set({ error: errorMessage });
          throw error;
        }
      },

      loginWithGoogle: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.loginWithGoogle(code);
          get().setAuth(response.data);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Google login failed";
          set({ error: errorMessage });
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
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
