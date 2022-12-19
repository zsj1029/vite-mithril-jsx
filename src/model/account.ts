import request, { Api } from "@/utils/request";
import sort, { SortEnum } from "@/coms/sort";
import { UpdtSession } from "./session";
import { MsgAdd, State } from "@/coms/message";
export enum AccountState {
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
  checked?: "checked" | "";
};

export const DropState = Object.entries(AccountState);

let CheckFlag = false;

export const CheckAll = () => {
  CheckFlag = !CheckFlag;
  List.forEach(
    (_, index) => (List[index].checked = CheckFlag ? "checked" : "")
  );
};

export const Batch = async (operation: "启用" | "禁用" | "删除") => {
  let data;
  // if (index !== undefined) {
  //   data = List.filter((_, i) => i === index).map((item) => item.username);
  // } else {
  if (!List.some((item) => item.checked === "checked")) {
    MsgAdd(State.failed, "请至少选择一条记录");
    return false;
  }
  data = List.filter((item) => item.checked === "checked").map(
    (item) => item.username
  );
  // }
  switch (operation) {
    case "启用":
      await request("post", Api.AccountState, {
        status: "active",
        username: JSON.stringify(data),
      });
      break;
    case "禁用":
      await request("post", Api.AccountState, {
        status: "disactive",
        username: JSON.stringify(data),
      });
      break;
    case "删除":
      await request("post", Api.AccountDelete, {
        username: data[0],
      });
      break;
  }
  MsgAdd(State.success, "操作成功");
  GetData();
  // }, 50);
};

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
  CheckFlag = false;
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
