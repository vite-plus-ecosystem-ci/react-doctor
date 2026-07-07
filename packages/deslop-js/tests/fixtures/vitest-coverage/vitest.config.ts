import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/core.ts", "src/utils.ts"],
    },
  },
});
