import Layouts from "@/layouts/layout";
import m, { VnodeDOM } from "mithril";

export const Sys = {
  "/sys/account/list": {
    onmatch: async () => (await import("@/pages/account/accountlist")).default,
    render: function (vnode: VnodeDOM) {
      // console.log(vnode);
      return m(Layouts, vnode);
    },
  },
  "/sys/account/list/add": {
    onmatch: async () => (await import("@/pages/account/accountadd")).default,
    render: function (vnode: any) {
      return m(Layouts, vnode);
    },
  },

  "/sys/log/list": {
    onmatch: async () => (await import("@/pages/account/accountadd")).default,
    render: function (vnode: any) {
      return m(Layouts, vnode);
    },
  },
  "/alterpassword": {
    onmatch: async () =>
      (await import("@/pages/account/alterpassword")).default,
    render: function (vnode: any) {
      return m(Layouts, vnode);
    },
  },
};
