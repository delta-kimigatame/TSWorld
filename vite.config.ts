/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [wasm()],
  test: {
    globals: true, // Jestの `global` な関数 (`describe`, `test` など) を有効にする
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "tsworld",
      fileName: (format) => `tsworld.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["fs", "path", "url", "crypto", "child_process", "ws"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
});
