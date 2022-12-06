import Layouts from "@/layouts/layout";
import m from "mithril";
export const License = {
  "/lic/list/wait": {
    // onmatch: async () => (await import("@/pages/license/liclist")).default,
    onmatch: async () => (await import("@/pages/license/liclist")).default,
    render: function (vnode) {
      return m(Layouts, vnode);
    },
  },
  "/lic/list/soon": {
    // onmatch: async () => (await import("@/pages/license/liclist")).default,
    onmatch: async () => (await import("@/pages/account/accountlist")).default,
    render: function (vnode) {
      return m(Layouts, vnode);
    },
  },
  "/lic/list/send": {
    // onmatch: async () => (await import("@/pages/license/liclist")).default,
    onmatch: async () => (await import("@/pages/account/accountlist")).default,
    render: function (vnode) {
      return m(Layouts, vnode);
    },
  },
  "/lic/list/expired": {
    // onmatch: async () => (await import("@/pages/license/liclist")).default,
    onmatch: async () => (await import("@/pages/account/accountlist")).default,
    render: function (vnode) {
      return m(Layouts, vnode);
    },
  },
};
