import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthResponse, LoginRequest, RegisterRequest, UpdateProfileRequest } from '../types/api';
import { authApi } from '../api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
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

      setAuth: (data: AuthResponse) => {
        set({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
          error: null,
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      },

      updateUser: (user: User) => {
        set({ user });
      },

      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(data);
          get().setAuth(response);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to login';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          get().setAuth(response);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to register';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        const token = get().token;
        if (!token) {
          get().clearAuth();
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await authApi.logout();
        } catch (error) {
          console.error('Logout error:', error);
          // Even if the server request fails, we still want to clear the local auth state
        } finally {
          get().clearAuth();
          set({ isLoading: false });
        }
      },

      refresh: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        set({ isLoading: true, error: null });
        try {
          const data = await authApi.refresh(refreshToken);
          get().setAuth(data);
        } catch (error) {
          get().clearAuth();
          const message = error instanceof Error ? error.message : 'Failed to refresh token';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateProfile: async (data: UpdateProfileRequest) => {
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await authApi.updateProfile(data);
          set({ user: updatedUser });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to update profile';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
