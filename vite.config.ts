import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Relative assets support both root domains and GitHub Pages repository paths.
export default defineConfig({ base: "./", plugins: [react(), tailwindcss()] });
