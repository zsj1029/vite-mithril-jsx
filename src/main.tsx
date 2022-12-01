/* @refresh reload */

import "virtual:windi.css";
import "@/assets/water/builds/water.css";
import m from "mithril";

// import ESM from "./esm";
import Login from "@/pages/login";
import { User } from "@/model";
import { Profile } from "./model/profile";
import Layout from "@/layouts/index";
const root = document.getElementById("root") as HTMLElement;
const Layout = (await import("@/layouts/index")).default;
const ASEMS = (await import("@/esm")).default;
const Login = (await import("@/pages/login")).default;
// m.mount(document.getElementById("root") as HTMLElement, App);
Profile.autoTheme();

import { Account } from "@/routers/account";

m.route(root, "/login", {
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
  "/layout": {
    render: () => {
      // return m(Layout, m(ASEMS));
      return (
        <Layout>
          <ASEMS />
        </Layout>
      );
    },
  },
  "/layout/me": {
    render: () => {
      // let x = m(ASEMS);
      // return m(Layout, x);
      return (
        <Layout>
          <Login>
            <red>third comp</red>
          </Login>
        </Layout>
      );
    },
  },
  "/login": {
    // onmatch: async () => (await import("@/pages/login")).default,
    // async onmatch(args) {
    //   return (await import("@/pages/login")).default;
    // },
    render(vnode) {
      // console.log(vnode);
      // return [vnode];
      return <Login />;
    },
  },
  ...Account,
});
