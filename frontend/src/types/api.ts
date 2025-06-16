import { typeList } from "../constants/contacts";

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
  // Додати інші поля користувача, якщо бекенд їх повертає, наприклад subscription
}

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    user: User; // Додаємо User до data об'єкту
    refreshToken?: string; // Додаємо refresh token
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  photo?: File;
  currentPassword?: string; // Додано
  newPassword?: string; // Додано
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photo?: string;
  isFavourite: boolean;
  contactType: string; // Змінено на string
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phoneNumber: string;
  photo?: File;
  isFavourite?: boolean;
  contactType: string; // Змінено на string
}

export interface UpdateContactRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  photo?: File;
  isFavourite?: boolean;
  contactType?: string; // Змінено на string
}

export interface GetContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number; // Додано
  hasPreviousPage: boolean; // Додано
  hasNextPage: boolean; // Додано
}

export interface GetContactsParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isFavourite?: boolean; // Змінено на boolean
  contactType?: string; // Змінено на string
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
