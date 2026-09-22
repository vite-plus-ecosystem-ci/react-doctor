import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8")) as {
  version: string;
};

export default defineConfig({
  pack: [
    {
      entry: {
        index: "./src/index.ts",
        "project-analysis-worker": "./src/project-analysis-worker.ts",
        schemas: "./src/schemas.ts",
      },
      deps: {
        // tsdown <0.23 compatibility: resolve external dependency subpaths.
        // Remove to preserve subpath imports as written (the new default).
        // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
        resolveDepSubpath: true,
        neverBundle: [
          "@astrojs/compiler",
          "@effect/platform-node-shared",
          "effect",
          "oxc-parser",
          "oxc-resolver",
          "oxlint",
          "oxlint-plugin-react-doctor",
          "typescript",
        ],
      },
      dts: true,
      target: "node20",
      platform: "node",
      fixedExtension: false,
      env: {
        REACT_DOCTOR_CORE_VERSION: packageJson.version,
      },
    },
  ],
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-0-0-rc-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    alias: [
      {
        find: /^@react-doctor\/core$/,
        replacement: path.join(packageRoot, "src/index.ts"),
      },
      {
        find: /^@react-doctor\/core\/schemas$/,
        replacement: path.join(packageRoot, "src/schemas.ts"),
      },
      {
        find: /^oxlint-plugin-react-doctor\/core$/,
        replacement: path.join(packageRoot, "../oxlint-plugin-react-doctor/src/core.ts"),
      },
      {
        find: /^oxlint-plugin-react-doctor$/,
        replacement: path.join(packageRoot, "../oxlint-plugin-react-doctor/src/index.ts"),
      },
    ],
    testTimeout: 30_000,
  },
});
