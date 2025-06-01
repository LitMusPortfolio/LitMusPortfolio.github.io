import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: true,
              meaninglessFileNames: ["index", "styles"],
              ssr: false,
              pure: true,
            },
          ],
        ],
      },
    }),
  ],
  // GitHub Pages用のベースパス設定
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
