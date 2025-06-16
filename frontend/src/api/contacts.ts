import axios from "axios";
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest
} from "../types/api";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export interface GetContactsParams {
  page?: number;
  perPage?: number; // Змінено з 'limit'
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isFavourite?: boolean; // Додано
  contactType?: "personal" | "work" | "other"; // Додано
}

export interface GetContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  perPage: number; // Змінено з 'limit'
}

export const contactsApi = {
  getContacts: async (
    params: GetContactsParams = {}
  ): Promise<GetContactsResponse> => {
    // Перетворюємо perPage на limit для бекенду, якщо API-контракт вимагає 'limit'
    const queryParams: any = { ...params };
    if (queryParams.perPage !== undefined) {
      queryParams.limit = queryParams.perPage;
      delete queryParams.perPage;
    }
    const { data } = await api.get<GetContactsResponse>("/contacts", {
      params: queryParams
    });
    return {
      contacts: data.data.data, // Розпаковуємо вкладену структуру
      total: data.data.totalItems, // Розпаковуємо
      page: data.data.page, // Розпаковуємо
      perPage: data.data.perPage // Розпаковуємо
    };
  },

  createContact: async (contact: CreateContactRequest): Promise<Contact> => {
    const formData = new FormData();
    // Використовуємо phoneNumber замість phone
    formData.append("name", contact.name);
    formData.append("email", contact.email);
    formData.append("phoneNumber", contact.phoneNumber); // Змінено з 'phone'
    if (contact.isFavourite !== undefined) {
      formData.append("isFavourite", String(contact.isFavourite));
    }
    if (contact.contactType) {
      // Додано contactType
      formData.append("contactType", contact.contactType);
    }
    if (contact.photo) {
      formData.append("photo", contact.photo);
    }

    const { data } = await api.post<Contact>("/contacts", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return data.data; // Бекенд повертає об'єкт в data.data
  },

  updateContact: async (
    id: string,
    contact: UpdateContactRequest
  ): Promise<Contact> => {
    const formData = new FormData();
    if (contact.name !== undefined) formData.append("name", contact.name);
    if (contact.email !== undefined) formData.append("email", contact.email);
    if (contact.phoneNumber !== undefined)
      formData.append("phoneNumber", contact.phoneNumber); // Змінено з 'phone'
    if (contact.isFavourite !== undefined)
      formData.append("isFavourite", String(contact.isFavourite));
    if (contact.contactType !== undefined)
      formData.append("contactType", contact.contactType); // Додано
    if (contact.photo) {
      formData.append("photo", contact.photo);
    }

    const { data } = await api.patch<Contact>(`/contacts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return data.data; // Бекенд повертає об'єкт в data.data
  },

  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  }
};
