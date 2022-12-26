import request, { Api, Download } from "@/utils/request";
import { SortEnum } from "@/coms/sort";
import m from "mithril";
import { MsgAdd, State } from "@/coms/message";
export enum LicState {
  过期,
  有效,
}

export enum LicStatus {
  未生成,
  已生成,
}

export const LicCountDown = {
  "< 15天": 15,
  "< 30天": 30,
  "< 45天": 45,
};

export enum LicSource {
  OA,
  录入,
}

export enum LicCertType {
  评估,
  售出,
}

export const LicValidtime = [
  "30天",
  "60天",
  "90天",
  "180天",
  "1年",
  "2年",
  "3年",
  "永久",
];
export const SearchValidtime = {
  "30天": '["30天"]',
  "60天": '["60天"]',
  "90天": '["90天"]',
  "180天": '["180天"]',
  ">=1年": '["1年","2年","3年","永久"]',
};

export const LicType = ["Node-Locked", "Floating"];
export enum LicTypes {
  "node-locked" = "Node-Locked",
  "floating" = "Floating",
}

export type LicItem = {
  order_id?: string;
  license_id?: string;
  license_status?: number; //（0无效1有效）
  product?: string;
  product_code?: string;
  po_order_id?: string;
  oa_order_id?: string;
  host_id?: string;
  purpose?: number; //证书类型
  type?: string; //许可证类型
  place?: string; //席位
  user?: string; //制单人
  proposer?: string; //申请人
  user_roler?: number;
  status?: number; //状态（0未生成1已生成）
  end_time?: string; //到期日
  validity_periods?: string; //有效天数
  created_time?: string;
  info_from?: number; //（0：oa 1：录入）
  customer?: string;
  name?: string;
  phone?: string;
  email?: string;
  countdown?: number; //倒计时
  remind_time?: number; //已提醒次数
  loading?: boolean;
  checked?: string;
  newEmail?: string;
  generate_time?: string; //生成时间
  licContent?: string; //许可证书内容
};

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
  Search.filters["license_status"] = LicStatus.未生成;
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
  create_time: SortEnum.none,
  validity_periods: SortEnum.none,
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
    create_time: SortEnum.none,
    validity_periods: SortEnum.none,
  };
  GetData();
};

export const Batch = async (operation: "批量生成" | "删除") => {
  if (!List.some((item) => item.checked === "checked")) {
    MsgAdd(State.failed, "请至少选择一条记录");
    return false;
  }
  const data = List.filter((item) => item.checked === "checked").map(
    (item) => item.order_id
  );
  switch (operation) {
    case "批量生成":
      try {
        await request("post", Api.LicenseGenerate, {
          order_ids: JSON.stringify(data),
        });
        MsgAdd(State.success, "操作成功");
      } catch (e) {
        alert(`以下许可证生成失败\n${e.data.error_list}`);
      }
      break;
    case "删除":
      await request("post", Api.LicenseDelete, {
        order_ids: JSON.stringify(data),
      });
      MsgAdd(State.success, "操作成功");
      break;
  }

  GetData();
};
