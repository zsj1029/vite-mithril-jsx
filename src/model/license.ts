import request, { Api } from "@/utils/request";
import sort, { SortEnum } from "@/coms/sort";

import { MsgAdd, State } from "@/coms/message";
export enum LicState {
  有效 = "valid",
  无效 = "invalid",
}

export type LicItem = {
  customer?: string;
  prod?: string;
  lic_num?: string;
  cert_type?: string;
  valid_age?: string;
  password?: string;
  po_code?: string;
  source?: string;
  apply?: string;
  create?: string;
  lic_type?: string;
  version?: string;
  checked?: "checked" | "";
  loading?: boolean;
};

export const DropState = Object.entries(LicState);

export const CheckAll = () => {
  let CheckFlag = false;
  if (List.every((item) => item.checked === "checked")) CheckFlag = true;
  else if (!List.some((item) => item.checked === "checked")) CheckFlag = false;

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
  sort: "",
  sort2: [],
} as AccountItem & {
  keyword?: string;
  page: number;
  size: number;
  sort: string;
  sort2: Array<{ attr: string; order: string }>;
  loading: boolean;
};

export let Data = {
  status: "active",
  loading: false,
} as AccountItem;
export let List = [] as Array<AccountItem>;

export const SetData = (data?: AccountItem) => {
  if (data === undefined)
    Data = {
      status: "active",
      loading: false,
    };
  else Data = data;
};

export const GetData = async () => {
  console.log(Search);
  // const data = { ...Search };
  Search.sort = JSON.stringify(Search.sort2);
  const resp = await request("get", Api.AccountList, Search);
  List = resp.list;
  Page.total = resp.total;
  // CheckFlag = false;
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
    Search.sort2 = [];
  } else {
    Search.sort2 = [{ attr, order: SortEnum[order] }];
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
    sort2: [],
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
