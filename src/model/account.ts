export enum AccountState {
  启用 = "active",
  禁用 = "disactive",
}

export type AccountItem = {
  account?: string;
  fullName?: string;
  state?: AccountState;
  roler?: string;
  email?: string;
  phone?: string;
  password?: string;
  rePwd?: string;
  create?: string;
};

export const DropState = Object.entries(AccountState);

export const Search = {} as AccountItem;

export const Data = {} as AccountItem;
export const List = [] as Array<AccountItem>;

export const Page = {
  current: 1,
  pageSize: 10,
  total: 0,
};

export const VV =
  "\x54\x32\x22\x24\x51\x6d\x32\x7e\x7b\x4a\x63\x63\x7b\x30\x4d\x62";

export const PageChange = (pageNum: number, pageSize: number) => {
  /**
   * TODO
   * 1.invoke API list
   * 1.change List data & Page.total
   */
};

// const attrsMapping = {
//   account: "username",
//   fullName: "full_name",
//   state: "status",
//   roler: "role",
//   email: "email",
//   phone: "phone",
//   password: "password",
//   rePwd: "rePwd",
//   create: "create_time",
// };
// const invertMapping = Object.fromEntries(
//   Object.entries(attrsMapping).map((item) => [item[1], item[0]])
// );
