/// <reference types='vitest' />
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/packages/frontend",

  server: {
    port: process.env.FE_PORT ? parseInt(process.env.FE_PORT) : 4000,
    host: "0.0.0.0"
  },

  preview: {
    port: process.env.FE_PREVIEW ? parseInt(process.env.FE_PREVIEW) : 4300,
    host: "0.0.0.0"
  },

  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    }
  },
  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/packages/frontend",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },

  define: {
    "import.meta.vitest": undefined
  },
  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest"
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    includeSource: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/packages/frontend",
      provider: "v8"
    }
  }
});
