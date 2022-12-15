import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import viteTsconfigPaths from "vite-tsconfig-paths";
import macrosPlugin from "vite-plugin-babel-macros";
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    macrosPlugin(),
    react({
      babel: {
        // Use .babelrc files, necessary to use LinguiJS CLI
        babelrc: true,
      },
    }),
    viteTsconfigPaths(),
    checker({ typescript: true }),
  ],
  build: {
    outDir: "build",
  },
});
