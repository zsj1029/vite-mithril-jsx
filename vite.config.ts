import { defineConfig } from "vite";

import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import basicSsl from "@vitejs/plugin-basic-ssl";
// import WindiCSS from "vite-plugin-windicss";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/vite-mithril-jsx/",
    server: {
      host: "0.0.0.0",
      proxy: {
        // "/data_export/": {
        //   target: "https://www.w3school.com.cn",
        //   changeOrigin: true,
        //   rewrite: (path) => "/example/html5/mov_bbb.mp4",
        // },
      },
    },
    esbuild: {
      jsx: "transform",
      jsxFactory: "m",
      jsxFragment: "'['",
      drop: command === "build" ? ["console", "debugger"] : [],
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
      // legacy(),
    ],
  };
});
