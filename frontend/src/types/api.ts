import { typeList } from "../constants/contacts"

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
  phoneNumber: string
  photo?: string
  isFavourite: boolean
  contactType: typeof typeList
  createdAt: string
  updatedAt: string
}

export interface CreateContactRequest {
  name: string
  email: string
  phoneNumber: string
  photo?: File
  isFavourite?: boolean
  contactType: typeof typeList

}

export interface UpdateContactRequest {
  name?: string
  email?: string
  phoneNumber?: string
  photo?: File
  isFavourite?: boolean
  contactType: typeof typeList

}

export interface GetContactsResponse {
  contacts: Contact[]
  total: number
  page: number
  perPage: number
}

export interface GetContactsParams {
  page: number
  perPage: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  contactType: typeof typeList

}

export interface UpdatePasswordRequest {
  currentPassword: string
  newPassword: string
}

