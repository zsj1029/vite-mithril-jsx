import Layouts from "@/layouts/layout";
// const AccountList = (await import("@/pages/account/list")).default;
// const AccountAdd = (await import("@/pages/account/add")).default;
import AccountList from "@/pages/account/list";
import AccountAdd from "@/pages/account/add";
import m from "mithril";
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
    render() {
      return (
        <Layouts>
          <AccountList />
        </Layouts>
      );
    },
  },
  "/account/add": {
    render() {
      return (
        <Layouts>
          <AccountAdd />
        </Layouts>
      );
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
