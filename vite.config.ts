/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Load env variables from the project root
  const env = loadEnv(mode, process.cwd(), "");

  // 1. Resolve custom resume path from .env (VITE_RESUME_JSON_PATH)
  // 2. Fall back to resume.local.json (ignored by Git *.local)
  // 3. Fall back to standard template resume.json
  let resumePath = env.VITE_RESUME_JSON_PATH || "./resume.local.json";
  if (!fs.existsSync(path.resolve(__dirname, resumePath))) {
    resumePath = "./resume.json";
  }

  const resumeData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, resumePath), "utf-8"),
  );

  // Load custom local AI memory if exists, otherwise load default template
  let aiMemoryPath = "./resume.local.md";
  if (!fs.existsSync(path.resolve(__dirname, aiMemoryPath))) {
    aiMemoryPath = "./src/data/ai-memory.md";
  }
  const aiMemoryData = fs.readFileSync(
    path.resolve(__dirname, aiMemoryPath),
    "utf-8",
  );

  return {
    plugins: [react(), tailwindcss()],
    base: "./", // Use relative paths for GitHub Pages
    server: {
      allowedHosts: true as const, // Allow all hosts inside the development container proxy
    },
    define: {
      __RESUME_DATA__: JSON.stringify(resumeData),
      __AI_MEMORY__: JSON.stringify(aiMemoryData),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  };
});
