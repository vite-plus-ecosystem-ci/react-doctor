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
        // tsdown <0.23 compatibility: resolve external dependency subpaths.
        // Remove to preserve subpath imports as written (the new default).
        // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
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
    // https://release-v1-0-0-rc-1-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    testTimeout: 30_000,
  },
});
