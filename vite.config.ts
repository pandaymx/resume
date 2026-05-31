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
    fs.readFileSync(path.resolve(__dirname, resumePath), "utf-8")
  );

  return {
    plugins: [react(), tailwindcss()],
    base: "./", // Use relative paths for GitHub Pages
    server: {
      allowedHosts: true, // Allow all hosts inside the development container proxy
    },
    define: {
      __RESUME_DATA__: JSON.stringify(resumeData),
    },
  };
});
