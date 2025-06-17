// frontend/src/api/contacts.ts

import type {
  Contact,
  GetContactsResponse,
  GetContactsParams
} from "../types/api";
import api from "./index"; // Імпортуємо центральний екземпляр

export { type GetContactsResponse, type GetContactsParams };

export const contactsApi = {
  getContacts: async (
    params: GetContactsParams = {}
  ): Promise<GetContactsResponse> => {
    // Логіка отримання контактів залишається без змін
    const queryParams: any = { ...params };
    if (queryParams.perPage !== undefined) {
      queryParams.limit = queryParams.perPage;
      delete queryParams.perPage;
    }
    const { data: responseData } = await api.get<any>("/contacts", {
      // Використовуємо any для гнучкості відповіді
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

  // Спрощено: функція тепер просто приймає і передає готовий FormData
  createContact: async (formData: FormData): Promise<Contact> => {
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

  // Спрощено: функція тепер просто приймає і передає готовий FormData
  updateContact: async (id: string, formData: FormData): Promise<Contact> => {
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
