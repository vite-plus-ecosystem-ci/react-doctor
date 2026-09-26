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
      entry: { core: "./src/core.ts", index: "./src/index.ts" },
      deps: {
        // tsdown <0.23 compatibility: resolve external dependency subpaths.
        // Remove to preserve subpath imports as written (the new default).
        // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
        resolveDepSubpath: true,
        // HACK: lightningcss and oxc-parser load platform-specific native
        // bindings relative to their own packages. Bundling their loaders
        // moves that lookup into dist, where the optional bindings are not
        // available (the same failure mode as react-doctor issue #404).
        neverBundle: ["lightningcss", "oxc-parser"],
      },
      dts: true,
      target: "node20",
      platform: "node",
      minify: process.env.NODE_ENV === "production",
      fixedExtension: false,
      env: {
        VERSION: process.env.VERSION ?? packageJson.version,
      },
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
