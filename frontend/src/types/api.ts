import { typeList } from "../constants/contacts";

// Базові типи для API відповідей
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Типи користувача
export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  subscription?: 'starter' | 'pro' | 'business';
  verify?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Типи аутентифікації
export interface AuthData {
  accessToken: string;
  user: User;
}

export type AuthResponse = ApiResponse<AuthData>;

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
  currentPassword?: string;
  newPassword?: string;
}

// Типи контактів
export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photo?: string;
  isFavourite: boolean;
  contactType: typeof typeList[number];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phoneNumber: string;
  photo?: File;
  isFavourite?: boolean;
  contactType?: typeof typeList[number];
}

export interface UpdateContactRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  photo?: File;
  isFavourite?: boolean;
  contactType?: typeof typeList[number];
}

export type ContactsResponse = ApiResponse<PaginatedResponse<Contact>>;

export interface GetContactsParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: 'name' | 'email' | 'phoneNumber' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  isFavourite?: boolean;
  contactType?: typeof typeList[number];
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Типи для помилок
export interface ApiError {
  status: number;
  message: string;
  error?: string;
}
