import { defineConfig } from "vite";

import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/vite-mithril-jsx/",
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
	plugins: [basicSsl(), viteMockServe()],
});
