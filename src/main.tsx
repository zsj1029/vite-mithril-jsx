/* @refresh reload */
import "@/water.css";
import "@/index.css";
import m from "mithril";
import hello1 from "./hello1";
import { User } from "@/model";
const root = document.getElementById("root") as HTMLElement;
// m.mount(document.getElementById("root") as HTMLElement, App);

m.route(root, "/hello", {
	"/app": { onmatch: async () => (await import("@/mith")).default(User) },
	"/hello": {
		onmatch: async () => (await import("./hello")).default(User),
	},
	// "/test": H,
});
