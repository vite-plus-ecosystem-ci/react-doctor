import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    include: ["spec/**/*-spec.{ts,tsx,js,jsx}", "spec/**/*.spec.{ts,tsx,js,jsx}"],
  },
});
