import { MsgAdd, State } from "@/coms/message";
import { SortEnum } from "@/coms/sort";
import request, { Api } from "@/utils/request";
import { GetPrevNum } from "./common";
import { LicItem, LicState, LicStatus } from "./license";

export const CheckAll = () => {
  let CheckFlag = false;
  if (List.every((item) => item.checked === "checked")) CheckFlag = true;
  else if (!List.some((item) => item.checked === "checked")) CheckFlag = false;

  CheckFlag = !CheckFlag;
  List.forEach(
    (_, index) => (List[index].checked = CheckFlag ? "checked" : "")
  );
};

export let Search = {
  loading: false,
  page: 0,
  size: 10,
  sort: [],
  filters: {},
} as {
  filters: LicItem & {
    keyword?: string;
    start_time?: string;
    end_time?: string;
  };

  page: number;
  size: number;
  sort: Array<{ attr: string; order: string }> | string;
  loading: boolean;
};

export let Data = {
  loading: false,
} as LicItem;

export let List = [] as Array<LicItem>;

export const SetData = (data?: LicItem) => {
  if (data === undefined)
    Data = {
      loading: false,
    };
  else Data = data;
};

export const GetData = async () => {
  Search.sort = JSON.stringify(Search.sort);
  Search.filters["status"] = LicStatus.已生成;
  Search.filters["license_status"] = LicState.有效;
  Search.filters["countdown"] = Search.filters["countdown"]
    ? Search.filters["countdown"]
    : 120;
  Search.filters = JSON.stringify(Search.filters);
  console.log(Search);
  request("get", Api.LicenseList, Search).then((resp) => {
    List = resp.list;
    Page.total = resp.total;
  });

  Search.sort = JSON.parse(Search.sort);
  Search.filters = JSON.parse(Search.filters);
  if (Search.filters["countdown"] === 120) {
    delete Search.filters.countdown;
  }

  GetPrevNum();
};

export let SortAttrs = {
  end_time: SortEnum.none,
  countdown: SortEnum.none,
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
    filters: {},
    sort: [],
  } as any;
  Page = {
    current: 1,
    pageSize: 10,
    total: 0,
  };
  SortAttrs = {
    end_time: SortEnum.none,
    countdown: SortEnum.none,
  };
  GetData();
};

export const Batch = async (operation: "再次提醒") => {
  const data = List.filter((item) => item.checked === "checked").map(
    (item) => item.order_id
  );
  switch (operation) {
    case "再次提醒":
      await request("get", Api.LicenseRemind, {
        order_ids: JSON.stringify(data),
      });
      MsgAdd(State.success, "操作成功");
      break;
  }

  GetData();
};
