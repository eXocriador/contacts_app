import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    css: {
      postcss: "./postcss.config.cjs"
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          // Змінено на '/api' для проксування лише API запитів
          target: env.VITE_API_URL || "https://api.exocriador.com",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, "") // Переписуємо шлях, видаляючи '/api'
        }
      }
    },
    preview: {
      port: 5173,
      host: true
    }
  };
});
