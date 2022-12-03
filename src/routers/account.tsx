import Layouts from "@/layouts/layout";
// const AccountLists = (await import("@/pages/account/list")).default;
// const AccountAdd = (await import("@/pages/account/add")).default;
import AccountList from "@/pages/account/accountlist";
import AccountAdd from "@/pages/account/add";
import m, { VnodeDOM } from "mithril";
export const AccountMenu: Menu = {
  path: "/account",
  name: "Account",
  com: Layouts,
  children: [
    {
      path: "/list",
      com: AccountList,
      name: "All Account",
    },
    {
      path: "/stopls",
      com: AccountList,
      name: "Stop List",
    },
    {
      path: "/add",
      com: AccountAdd,
      name: "Create Account",
    },
  ],
};

export const Account = {
  "/account/list": {
    onmatch: async () => (await import("@/pages/account/accountlist")).default,
    render: function (vnode: VnodeDOM) {
      // console.log(vnode);
      return m(Layouts, vnode);
    },
  },
  "/account/add": {
    onmatch: async () => (await import("@/pages/account/add")).default,
    render: function (vnode: any) {
      return m(Layouts, vnode);
    },
  },
};

type Menu = {
  path: string;
  name: string;
  com: object;
  children?: Array<Menu>;
};

// for (const item in Account) {
//   console.log(item, Account[item]);
// }
// console.log(Object.values(Account));
