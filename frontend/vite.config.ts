import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    css: {
      postcss: "./postcss.config.js"
    },
    server: {
      port: 5173,
      proxy: {
        // Проксі для запитів /api до бекенду під час розробки
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3000",
          changeOrigin: true,
          secure: false, // Важливо для локальної розробки (http)
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    preview: {
      port: 5173,
      host: true
    }
  };
});
