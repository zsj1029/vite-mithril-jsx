/* @refresh reload */

import "virtual:windi.css";
import "@/assets/water/builds/water.css";
import m from "mithril";

import ESM from "./esm";
import { User } from "@/model";
import { Profile } from "./model/profile";
const root = document.getElementById("root") as HTMLElement;
// m.mount(document.getElementById("root") as HTMLElement, App);
Profile.autoTheme();
m.route(root, "/login", {
  "/app": { onmatch: async () => (await import("@/mith")).default },
  "/coutDown": {
    onmatch: async () => (await import("@/lic-countdown")).default,
  },
  "/test": {
    render: () => <ESM age="900" />,
  },
  "/esm": {
    render: () => m(ESM, { age: 999 }),
  },
  "/login": { onmatch: async () => (await import("@/pages/login")).default },
});
