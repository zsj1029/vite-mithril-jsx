/* @refresh reload */

 //import "virtual:windi.css";
import "@/index.css";
import "@/assets/water/builds/water.css";

import m from "mithril";
import "@/coms/alert";

 //import ESM from "./esm";
// const ESM = (await import("./esm")).default;
// import Login from "@/pages/login";
// import { User } from "@/model";
import { Profile } from "./model/profile";
const root = document.getElementById("root") as HTMLElement;

// import Layout from "@/layouts/layout";
// const ASEMS = (await import("@/esm")).default;
// const Login = (await import("@/pages/login")).default;
// m.mount(document.getElementById("root") as HTMLElement, ESM);
Profile.autoTheme();

import { Sys } from "@/routers/sys";
import { License } from "@/routers/license";

const routes = {
  // "/app": { onmatch: async () => (await import("@/mith")).default },
  // "/countDown": {
  //   onmatch: async () => (await import("@/lic-countdown")).default,
  // },
  // "/test": {
  //   render: () => <ESM age="900" />,
  // },
  // "/esm": {
  //   render: () => m(ESM, { age: 999 }),
  // },
  // "/eee": ESM,
  // "/layout": {
  //   render: () => {
  //     // return m(Layout, m(ASEMS));
  //     return (
  //       <Layout>
  //         <ASEMS />
  //       </Layout>
  //     );
  //   },
  // },
  // "/login": {
  //   onmatch: async () => (await import("@/pages/login")).default,
  // },
  "/login": {
    onmatch: async () => (await import("@/pages/login")).default,
  },
  ...Sys,
  ...License,
};

// console.log(routes);

m.route(root, "/login", routes);
