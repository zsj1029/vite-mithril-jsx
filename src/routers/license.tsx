import Layouts from "@/layouts/layout";
import m from "mithril";
export const License = {
  "/lic/list/:group": {
    onmatch: async () => (await import("@/pages/license/liclist")).default,
    render: function (vnode) {
      return m(Layouts, vnode);
    },
  },
};
