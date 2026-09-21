import { defineConfig } from "vite-plus";
import { requireTypescriptPlugin } from "../../scripts/require-typescript-plugin.js";

export default defineConfig({
  pack: [
    {
      entry: {
        index: "./src/index.ts",
        "project-analysis-worker": "./src/project-analysis-worker.ts",
        "oxlint-worker": "./src/oxlint-worker.ts",
        "duplicate-jsx-worker": "./src/duplicate-jsx-worker.ts",
      },
      deps: {
        resolveDepSubpath: true,
        alwaysBundle: ["typescript"],
        neverBundle: [
          "effect",
          "oxc-parser",
          "oxc-resolver",
          "oxlint",
          "oxlint-plugin-react-doctor",
        ],
      },
      plugins: [requireTypescriptPlugin()],
      dts: true,
      target: "node20",
      platform: "node",
      fixedExtension: false,
    },
  ],
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://rfc-vitest-v5-upgrade-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    testTimeout: 30_000,
  },
});
