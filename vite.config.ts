import { defineConfig } from "vite";

import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import basicSsl from "@vitejs/plugin-basic-ssl";
// import WindiCSS from "vite-plugin-windicss";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vite-mithril-jsx/",
  server: {
    host: "0.0.0.0",
  },
  esbuild: {
    jsx: "transform",
    jsxFactory: "m",
    jsxFragment: "'['",
  },
  build: {
    target: "ESNext",
    cssTarget: "chrome80",
  },
  resolve: {
    conditions: ["development", "browser"],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    basicSsl(),
    // WindiCSS(),
    viteMockServe({ prodEnabled: false }),
    legacy(),
  ],
});
