/* @refresh reload */

import "virtual:windi.css";
import "@/assets/water/builds/water.css";
import m from "mithril";

import ESM from "./esm";
import { User } from "@/model";
const root = document.getElementById("root") as HTMLElement;
// m.mount(document.getElementById("root") as HTMLElement, App);

m.route(root, "/coutDown/test1", {
	"/app": { onmatch: async () => (await import("@/mith")).default },
	"/coutDown/:test": {
		onmatch: async () => (await import("@/lic-countdown")).default,
	},
	"/test": {
		render: () => <ESM age="900" />,
	},
	"/esm": {
		render: () => m(ESM, { age: 999 }),
	},
});
