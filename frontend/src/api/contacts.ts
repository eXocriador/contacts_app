import { client } from './client';
import type { Contact, CreateContactRequest, UpdateContactRequest } from '../types/api';

export const contactsApi = {
  getAll: async (): Promise<Contact[]> => {
    const response = await client.get('/contacts');
    return response.data;
  },

  getById: async (id: string): Promise<Contact> => {
    const response = await client.get(`/contacts/${id}`);
    return response.data;
  },

  create: async (contact: CreateContactRequest): Promise<Contact> => {
    const formData = new FormData();
    Object.entries(contact).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await client.post('/contacts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, contact: UpdateContactRequest): Promise<Contact> => {
    const formData = new FormData();
    Object.entries(contact).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await client.put(`/contacts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/contacts/${id}`);
  },

  toggleFavorite: async (id: string, favorite: boolean): Promise<Contact> => {
    const { data } = await client.patch(`/contacts/${id}/favorite`, { favorite });
    return data;
  },
};
