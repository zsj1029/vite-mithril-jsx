import request, { Api } from "@/utils/request";
import sort, { SortEnum } from "@/coms/sort";
import { UpdtSession } from "./session";
export enum AccountState {
  // 启用 = "active",
  // 禁用 = "disactive",
  active = "启用",
  disactive = "禁用",
}

export type AccountItem = {
  username?: string;
  full_name?: string;
  status?: string;
  email?: string;
  phone?: string;
  password?: string;
  rePwd?: string;
  create_time?: string;
  role_zh?: string;
  role?: string;
  role_name?: string;
  version?: string;
};

export const DropState = Object.entries(AccountState);

export let Search = {
  loading: false,
  page: 0,
  size: 10,
  sort: [],
} as AccountItem & {
  keyword?: string;
  page: number;
  size: number;
  sort: Array<{ attr: string; order: string }>;
  loading: boolean;
};

export const Data = {} as AccountItem;
export let List = [] as Array<AccountItem>;

export const GetData = async () => {
  console.log(Search);
  const data = { ...Search };
  data.sort = JSON.stringify(Search.sort);
  const resp = await request("get", Api.AccountList, data);
  List = resp.list;
  Page.total = resp.total;
};

export let SortAttrs = {
  create_time: SortEnum.none,
  status: SortEnum.none,
};

export const SortEvent = (attr: string, order: SortEnum) => {
  Object.keys(SortAttrs).forEach((key) => {
    if (key === attr) {
      SortAttrs[key] = order;
    } else {
      SortAttrs[key] = SortEnum.none;
    }
  });
  if (order === SortEnum.none) {
    Search.sort = [];
  } else {
    Search.sort = [{ attr, order: SortEnum[order] }];
  }
  GetData();
};

export let Page = {
  current: 1,
  pageSize: 10,
  total: 0,
};
export const PageChange = (pageNum: number, pageSize: number) => {
  /**
   * TODO
   * 1.invoke API list
   * 1.change List data & Page.total
   */
  Page.current = pageNum;
  Page.pageSize = pageSize;
  Search.page = pageNum - 1;
  Search.size = pageSize;
  GetData();
};

export const Reset = () => {
  Search = {
    loading: false,
    page: 0,
    size: 10,
    sort: [],
  } as any;
  Page = {
    current: 1,
    pageSize: 10,
    total: 0,
  };
  SortAttrs = {
    create_time: SortEnum.none,
    status: SortEnum.none,
  };
  GetData();
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
