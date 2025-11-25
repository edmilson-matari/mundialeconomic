import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Habilita servir sempre o index.html para SPA routes
    open: true,
  },
  build: {
    rollupOptions: {
      // fallback para SPA no build final
      input: "/index.html",
    },
  },
});
