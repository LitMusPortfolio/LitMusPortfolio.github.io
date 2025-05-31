import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages用のベースパス設定
  base: process.env.NODE_ENV === "production" ? "/litmus9.com/" : "/",
});
