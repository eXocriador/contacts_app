import axios from 'axios';
import type { Contact, CreateContactRequest, UpdateContactRequest } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface GetContactsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  limit: number;
}

export const contactsApi = {
  getContacts: async (params: GetContactsParams = {}): Promise<GetContactsResponse> => {
    const { data } = await api.get<GetContactsResponse>('/contacts', { params });
    return data;
  },

  createContact: async (contact: CreateContactRequest & { photo?: File }): Promise<Contact> => {
    if (contact.photo) {
      const formData = new FormData();
      Object.entries(contact).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const { data } = await api.post<Contact>('/contacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    }
    const { data } = await api.post<Contact>('/contacts', contact);
    return data;
  },

  updateContact: async (id: string, contact: UpdateContactRequest & { photo?: File }): Promise<Contact> => {
    if (contact.photo) {
      const formData = new FormData();
      Object.entries(contact).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const { data } = await api.patch<Contact>(`/contacts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    }
    const { data } = await api.patch<Contact>(`/contacts/${id}`, contact);
    return data;
  },

  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  },
};
