import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Temporary config used ONLY to produce the static bundle for GitHub Pages.
// Mirrors vite.config.ts (react + tailwind + @ alias + React dedupe) but omits
// the vlyPlugin, which requires platform services unavailable in this build
// container. Not used by the dev server.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
  },
  build: {
    sourcemap: false,
  },
});
