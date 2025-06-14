import { client } from './client';
import type { AuthResponse, LoginRequest, RegisterRequest, User, UpdateProfileRequest } from '../types/api';

interface GoogleAuthUrlResponse {
  url: string;
}

export const authApi = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await client.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await client.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await client.post('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    const response = await client.get<User>('/auth/me');
    return response.data;
  },

  async refresh(refreshToken: string): Promise<AuthResponse> {
    const response = await client.post<AuthResponse>('/auth/refresh', { refreshToken });
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await client.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await client.post('/auth/reset-password', { token, password });
  },

  async getGoogleAuthUrl(): Promise<GoogleAuthUrlResponse> {
    const response = await client.get<GoogleAuthUrlResponse>('/auth/google/url');
    return response.data;
  },

  async loginWithGoogle(code: string): Promise<AuthResponse> {
    const response = await client.post<AuthResponse>('/auth/google/callback', { code });
    return response.data;
  },

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await client.put<User>('/auth/profile', data);
    return response.data;
  },
};
