import axios from "axios";
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest
} from "../types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Додано дефолтне значення

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export interface GetContactsParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isFavourite?: boolean;
  contactType?: "personal" | "work" | "other";
}

export interface BackendPaginatedResponse<T> {
  // Новий інтерфейс для відповіді бекенду
  status: number;
  message: string;
  data: {
    data: T[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface GetContactsResponse {
  // Адаптований інтерфейс для фронтенду
  contacts: Contact[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const contactsApi = {
  getContacts: async (
    params: GetContactsParams = {}
  ): Promise<GetContactsResponse> => {
    const queryParams: any = { ...params };
    if (queryParams.perPage !== undefined) {
      queryParams.limit = queryParams.perPage;
      delete queryParams.perPage;
    }
    const { data: responseData } = await api.get<
      BackendPaginatedResponse<Contact>
    >("/contacts", {
      // Використовуємо новий інтерфейс
      params: queryParams
    });
    return {
      contacts: responseData.data.data,
      total: responseData.data.totalItems,
      page: responseData.data.page,
      perPage: responseData.data.perPage,
      totalPages: responseData.data.totalPages,
      hasPreviousPage: responseData.data.hasPreviousPage,
      hasNextPage: responseData.data.hasNextPage
    };
  },

  createContact: async (contact: CreateContactRequest): Promise<Contact> => {
    const formData = new FormData();
    formData.append("name", contact.name);
    formData.append("email", contact.email);
    formData.append("phoneNumber", contact.phoneNumber);
    if (contact.isFavourite !== undefined) {
      formData.append("isFavourite", String(contact.isFavourite));
    }
    formData.append("contactType", contact.contactType); // Завжди надсилаємо contactType
    if (contact.photo) {
      formData.append("photo", contact.photo);
    }

    const { data: responseData } = await api.post<{ data: Contact }>(
      "/contacts",
      formData,
      {
        // Змінено тип повернення
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return responseData.data;
  },

  updateContact: async (
    id: string,
    contact: UpdateContactRequest
  ): Promise<Contact> => {
    const formData = new FormData();
    if (contact.name !== undefined) formData.append("name", contact.name);
    if (contact.email !== undefined) formData.append("email", contact.email);
    if (contact.phoneNumber !== undefined)
      formData.append("phoneNumber", contact.phoneNumber);
    if (contact.isFavourite !== undefined)
      formData.append("isFavourite", String(contact.isFavourite));
    if (contact.contactType !== undefined)
      formData.append("contactType", contact.contactType); // Завжди надсилаємо contactType
    if (contact.photo) {
      formData.append("photo", contact.photo);
    }

    const { data: responseData } = await api.patch<{ data: Contact }>(
      `/contacts/${id}`,
      formData,
      {
        // Змінено тип повернення
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return responseData.data;
  },

  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  }
};
