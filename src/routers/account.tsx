import Layouts from "@/layouts/layout";
import m, { VnodeDOM } from "mithril";

export const Account = {
  "/account/list": {
    onmatch: async () => (await import("@/pages/account/accountlist")).default,
    render: function (vnode: VnodeDOM) {
      // console.log(vnode);
      return m(Layouts, vnode);
    },
  },
  "/account/list/add": {
    onmatch: async () => (await import("@/pages/account/add")).default,
    render: function (vnode: any) {
      return m(Layouts, vnode);
    },
  },
};
