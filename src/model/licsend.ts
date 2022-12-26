import { SortEnum } from "@/coms/sort";
import request, { Api, Download } from "@/utils/request";
import { LicItem, LicStatus } from "./license";

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
  Search.filters["license_status"] = LicStatus.已生成;
  Search.filters = JSON.stringify(Search.filters);
  console.log(Search);
  request("get", Api.LicenseList, Search).then((resp) => {
    List = resp.list;
    Page.total = resp.total;
  });
  Search.sort = JSON.parse(Search.sort);
  Search.filters = JSON.parse(Search.filters);
};

export let SortAttrs = {
  generate_time: SortEnum.none,
  end_time: SortEnum.none,
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
    generate_time: SortEnum.none,
  };
  GetData();
};

export const Export = async () => {
  Search.sort = JSON.stringify(Search.sort);
  Search.filters["license_status"] = LicStatus.已生成;
  Search.filters = JSON.stringify(Search.filters);
  const tmp = {
    page: Search.page,
    size: Search.size,
  };
  Search.page = 0;
  Search.size = 9999999999;
  console.log(Search);
  const resp = await request("get", Api.LicenseExport, Search, "blob");
  Search.sort = JSON.parse(Search.sort);
  Search.filters = JSON.parse(Search.filters);
  Search.page = tmp.page;
  Search.size = tmp.size;

  Download(
    resp,
    "导出License.xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
};
