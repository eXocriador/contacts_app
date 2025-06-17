// frontend/src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache
} from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { useAuthStore } from "./store/auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Створюємо екземпляр QueryClient з глобальним обробником помилок
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error) => {
      // Перевіряємо, чи це помилка 401 (Unauthorized)
      if (error instanceof AxiosError && error.response?.status === 401) {
        const { refresh, logout } = useAuthStore.getState();
        try {
          // Намагаємося оновити токен
          await refresh();
          // Якщо успішно, інвалідуємо всі запити, щоб react-query їх повторив
          await queryClient.invalidateQueries();
          toast.success("Session refreshed. Please try again.");
        } catch (refreshError) {
          // Якщо оновлення невдале, виконуємо вихід
          toast.error("Your session has expired. Please log in again.");
          logout();
        }
      } else {
        // Для інших помилок просто показуємо сповіщення
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message || error.message
            : "An unexpected error occurred.";
        toast.error(errorMessage);
      }
    }
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1 // Робимо одну спробу перед тим, як onError спрацює
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
