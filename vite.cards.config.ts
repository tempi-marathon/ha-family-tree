import { defineConfig } from "vite";
import { resolve } from "node:path";

const root = import.meta.dirname;

/** Self-contained Lovelace cards bundle (no shared chunks with the panel). */
export default defineConfig({
  build: {
    outDir: resolve(root, "custom_components/family_tree/dist"),
    emptyOutDir: false,
    sourcemap: true,
    target: "es2022",
    rollupOptions: {
      input: {
        "family-tree-cards": resolve(root, "frontend/src/cards/index.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
        codeSplitting: false,
      },
    },
  },
});
