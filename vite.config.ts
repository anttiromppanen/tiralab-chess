/// <reference types="vitest" />

import { defineConfig, configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    coverage: {
      provider: "v8",
      exclude: [
        ...configDefaults.coverage.exclude,
        "src/const/**",
        "src/types/**",
      ],
    },
  },
});
