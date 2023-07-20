import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs"; // Import the plugin

export default defineConfig({
  plugins: [react(), commonjs()],
  assetsInclude: ["**/*.node"]
});