import { defineConfig } from "tsdown";

// File names stay the ones tsup wrote: index.js (CommonJS), index.mjs, index.d.ts, index.d.mts.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: { sourcemap: false },
  sourcemap: false,
  target: "es2020",
  outExtensions: ({ format }) =>
    format === "cjs" ? { js: ".js", dts: ".d.ts" } : { js: ".mjs", dts: ".d.mts" },
});
