import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    host: "0.0.0.0", // This allows the server to be accessible externally
    port: 3000, // Change this port if needed
    open: true, // Optional: automatically open the app in the default browser
  },
});
