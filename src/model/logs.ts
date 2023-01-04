import request, { Api } from "@/utils/request";
import { SortEnum } from "@/coms/sort";

export type LogItem = {
  who?: string;
  action?: string;
  browser?: number;
  re_param?: string;
  respond?: string;
  module?: string;
  log_id?: string;
  ip?: string;
  time?: string;
  status?: number;
  role?: string;
  content?: string;
};

export let Search = {
  loading: false,
  page: 0,
  size: 10,
  sort: [],
  filters: {},
} as {
  filters: LogItem & {
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
} as LogItem;

export let List = [] as Array<LogItem>;

export const SetData = (data?: LogItem) => {
  if (data === undefined)
    Data = {
      loading: false,
    };
  else Data = data;
};

export const GetData = async () => {
  Search.sort = JSON.stringify(Search.sort);
  Search.filters = JSON.stringify(Search.filters);
  console.log(Search);
  request("get", Api.LogList, Search).then((resp) => {
    List = resp.list;
    Page.total = resp.total;
  });
  Search.sort = JSON.parse(Search.sort);
  Search.filters = JSON.parse(Search.filters);
};

export let SortAttrs = {
  ip: SortEnum.none,
  time: SortEnum.none,
  who: SortEnum.none,
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
    ip: SortEnum.none,
    who: SortEnum.none,
    time: SortEnum.none,
  };
  GetData();
};
