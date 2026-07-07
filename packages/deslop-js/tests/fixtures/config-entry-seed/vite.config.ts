import { defineConfig } from "vite-plus";
import { myPlugin } from "./src/vite-plugin";

export default defineConfig({
  plugins: [myPlugin()],
});
