export interface User {
  id: string
  name: string
  email: string
  photo?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface UpdateProfileRequest {
  name?: string
  email?: string
  photo?: File
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
  isFavourite: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateContactRequest {
  name: string
  email: string
  phone: string
  photo?: File
  isFavourite?: boolean
}

export interface UpdateContactRequest {
  name?: string
  email?: string
  phone?: string
  photo?: File
  isFavourite?: boolean
}

export interface GetContactsResponse {
  contacts: Contact[]
  total: number
  page: number
  limit: number
}

export interface GetContactsParams {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface UpdatePasswordRequest {
  currentPassword: string
  newPassword: string
}
