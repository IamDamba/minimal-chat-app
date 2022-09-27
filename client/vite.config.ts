import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "https://iamdamba-minimal-chat-app.vercel.app",
        changeOrigin: false,
        ws: true,
      },
    },
  },
});
