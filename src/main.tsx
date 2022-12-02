/* @refresh reload */

import "virtual:windi.css";
import "@/assets/water/builds/water.css";
import m from "mithril";

// import ESM from "./esm";
// const ESM = (await import("./esm")).default;
// import Login from "@/pages/login";
// import { User } from "@/model";
import { Profile } from "./model/profile";
const root = document.getElementById("root") as HTMLElement;

// import Layout from "@/layouts/layout";
// const ASEMS = (await import("@/esm")).default;
// const Login = (await import("@/pages/login")).default;
// m.mount(document.getElementById("root") as HTMLElement, App);
Profile.autoTheme();

import { Account } from "@/routers/account";
import { License } from "@/routers/license";

const routes = {
  "/app": { onmatch: async () => (await import("@/mith")).default },
  "/coutDown": {
    onmatch: async () => (await import("@/lic-countdown")).default,
  },
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
  ...Account,
  ...License,
};

// console.log(routes);

m.route(root, "/login", routes);
