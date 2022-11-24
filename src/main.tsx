/* @refresh reload */
// import { render } from "solid-js/web";
import "@/index.css";
// import App from "@/app";

import m from "mithril";
// import App from "@/mith";
// import Hello from "@/hello";
const root = document.getElementById("root") as HTMLElement;
// m.mount(document.getElementById("root") as HTMLElement, App);

m.route(root, "/app", {
	"/app": { onmatch: async () => (await import("@/mith")).default },
	"/hello": {
		onmatch: async () => (await import("./hello")).default(2),
	},
	// "/hello": Hello(2),
});

// render(() => <App />, document.getElementById("root") as HTMLElement);
