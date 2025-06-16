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
        "/": {
          target: env.VITE_API_URL || "https://api.exocriador.art",
          changeOrigin: true,
          secure: true
        }
      }
    },
    preview: {
      port: 5173,
      host: true
    }
  };
});
