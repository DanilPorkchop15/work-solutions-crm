/// <reference types='vitest' />
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { esbuildDecorators } from "@anatine/esbuild-decorators";
import { join } from "path";

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

  resolve: {
    alias: {
      "@frontend": __dirname + "/src"
    }
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    postcss: "./postcss.config.js"
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildDecorators({
          tsx: true,
          tsconfig: join(__dirname, "tsconfig.app.json")
        })
      ]
    }
  },

  plugins: [
    react({
      useAtYourOwnRisk_mutateSwcOptions(swcOptions) {
        // @ts-ignore
        swcOptions.jsc.parser.decorators = true;
      }
    }),
    nxViteTsPaths()
  ],
  build: {
    outDir: "../../dist/packages/frontend",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },

  define: {
    "import.meta.vitest": undefined
  }
});
