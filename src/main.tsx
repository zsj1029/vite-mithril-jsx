/* @refresh reload */
import "@/index.css";
import m from "mithril";

const root = document.getElementById("root") as HTMLElement;
// m.mount(document.getElementById("root") as HTMLElement, App);

m.route(root, "/hello", {
	"/app": { onmatch: async () => (await import("@/mith")).default },
	"/hello": {
		onmatch: async () => (await import("./hello")).default(2),
	},
	// "/hello": Hello(2),
});
