// frontend/src/api/contacts.ts

import type {
  Contact,
  ContactsResponse,
  GetContactsParams,
  CreateContactRequest,
  UpdateContactRequest
} from "../types/api";
import api from "./index"; // Імпортуємо центральний екземпляр

export { type ContactsResponse, type GetContactsParams };

export const contactsApi = {
  getContacts: async (
    params: GetContactsParams = {}
  ): Promise<ContactsResponse> => {
    const queryParams: Record<string, any> = { ...params };
    if (queryParams.perPage !== undefined) {
      queryParams.limit = queryParams.perPage;
      delete queryParams.perPage;
    }

    const { data } = await api.get<ContactsResponse>("/contacts", {
      params: queryParams
    });
    return data;
  },

  // Спрощено: функція тепер просто приймає і передає готовий FormData
  createContact: async (formData: FormData): Promise<Contact> => {
    const { data } = await api.post<{ data: Contact }>(
      "/contacts",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return data.data;
  },

  // Спрощено: функція тепер просто приймає і передає готовий FormData
  updateContact: async (id: string, formData: FormData): Promise<Contact> => {
    const { data } = await api.patch<{ data: Contact }>(
      `/contacts/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return data.data;
  },

  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  }
};
