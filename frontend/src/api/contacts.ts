// frontend/src/api/contacts.ts

import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest
} from "../types/api";
import api from "./index"; // Імпортуємо центральний екземпляр

// ... (інтерфейси GetContactsParams, BackendPaginatedResponse, GetContactsResponse залишаються без змін)
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
    Object.entries(contact).forEach(([key, value]) => {
      if (key !== "photo" && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (contact.photo) {
      formData.append("photo", contact.photo);
    }

    const { data: responseData } = await api.post<{ data: Contact }>(
      "/contacts",
      formData,
      {
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
    Object.entries(contact).forEach(([key, value]) => {
      if (key !== "photo" && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (contact.photo) {
      formData.append("photo", contact.photo);
    }

    const { data: responseData } = await api.patch<{ data: Contact }>(
      `/contacts/${id}`,
      formData,
      {
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
