import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8")) as {
  version: string;
};

export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://rfc-vitest-v5-upgrade-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  pack: [
    {
      entry: { index: "./src/index.ts" },
      deps: { resolveDepSubpath: true, neverBundle: ["oxlint-plugin-react-doctor"] },
      dts: true,
      target: "node20",
      platform: "node",
      fixedExtension: false,
      env: {
        VERSION: process.env.VERSION ?? packageJson.version,
      },
    },
  ],
});
