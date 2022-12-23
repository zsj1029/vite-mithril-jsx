import m from "mithril";
import LicInfo from "@/pages/license/licinfo";

import dialogPolyfill from "dialog-polyfill";
import {
  SortEvent,
  Search,
  LicType,
  SearchValidtime,
  Reset,
  GetData,
  Page,
  List,
  SetData,
  LicCertType,
  LicSource,
  CheckAll,
  SortAttrs,
  PageChange,
  Batch,
  Data,
} from "@/model/license";
import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import Sort from "@/coms/sort";
import { ProductList } from "@/model/common";
import { MsgAdd, State } from "@/coms/message";

const topBar = Routes.find((item) => item.key === "authorization");

// whitespace-pre overflow-auto

export default {
  dialogText: "",
  oncreate() {
    if (Page.total === 0) {
      GetData();
    }
    dialogPolyfill.registerDialog(
      document.getElementById("confirm") as HTMLDialogElement
    );
  },

  view({ attrs }) {
    return (
      <>
        <LicInfo Data={Data} />
        <TopBar menus={topBar} />
        <form class="flex space-x-1.5 h-8">
          <select
            class="min-w-[120px]"
            value={Search.filters.product_code ?? ""}
            onchange={(e) => (Search.filters.product_code = e.target.value)}
          >
            <option value="">[产品]</option>
            {ProductList.map((item) => (
              <option value={item.product_code}>{item.product}</option>
            ))}
          </select>
          <select
            value={Search.filters.purpose ?? ""}
            onchange={(e) => (Search.filters.purpose = e.target.value)}
          >
            <option value="">[证书类型]</option>
            {Object.values(LicCertType)
              .filter((item) => typeof item !== "number")
              .map((item, index) => (
                <option value={index}>{item}</option>
              ))}
          </select>
          <select
            value={Search.filters.type ?? ""}
            onchange={(e) => (Search.filters.type = e.target.value)}
          >
            <option value="">[许可类型]</option>
            {LicType.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select
            value={Search.filters.validity_periods ?? ""}
            onchange={(e) => (Search.filters.validity_periods = e.target.value)}
          >
            <option value="">[有效期]</option>
            {Object.entries(SearchValidtime).map((item) => (
              <option value={item[1]}>{item[0]}</option>
            ))}
          </select>
          <input
            type="input"
            value={Search.filters.keyword}
            oninput={(e) => (Search.filters.keyword = e.target.value)}
            class=" w-36"
            placeholder="关键字搜索"
          />
          <button type="button" class="px-4" onclick={GetData}>
            搜索
          </button>
          <button type="reset" onclick={Reset} class="px-4">
            重置
          </button>
        </form>

        <hr class="my-4"></hr>
        <div class="min-h-[675px]">
          <table class="mb-6 table-auto  h-1">
            <thead class="select-none">
              <tr>
                <th class="w-10 ">
                  <a href="JavaScript:void(0);" onclick={CheckAll}>
                    全选
                  </a>
                </th>
                <th>产品/客户</th>
                <th>许可证号</th>
                <th>证书类型</th>
                <th>许可类型</th>
                <th>席位</th>
                <th class="flex space-x-1 items-center">
                  <Sort
                    order={SortAttrs.validity_periods}
                    value={{ name: "有效期", attr: "validity_periods" }}
                    sortEvent={SortEvent}
                  />
                </th>
                <th>PO单号</th>
                <th>来源</th>
                <th class="w-38">
                  <Sort
                    order={SortAttrs.create_time}
                    value={{ name: "申请时间", attr: "create_time" }}
                    sortEvent={SortEvent}
                  />
                </th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {List.map((item, index) => {
                return (
                  <tr>
                    <td class="">
                      <input
                        class="ml-2 mt-1"
                        type="checkbox"
                        checked={item.checked}
                        onchange={(e) => {
                          List[index].checked =
                            item.checked === "checked" ? "" : "checked";
                        }}
                      />
                    </td>
                    <td>
                      <blockquote class="my-0 not-italic py-1 p-2 min-h-[50px]">
                        {item.product}
                        <footer class="border-t-0 pt-0">
                          <cite>{item.customer}</cite>
                        </footer>
                      </blockquote>
                    </td>
                    <td class="cursor-pointer ">
                      <a
                        class="pt-2 "
                        onclick={() => {
                          item.newEmail = item.email;
                          SetData(item);
                          document.getElementById("dialog")?.showModal();
                        }}
                        href="JavaScript:void(0);"
                      >
                        {item.order_id}
                      </a>
                    </td>

                    <td>{LicCertType[item.purpose]}</td>
                    <td>{item.type}</td>

                    <td>{item.place ? item.place : "N/A"}</td>
                    <td class="font-bold ">{item.validity_periods}</td>
                    <td>{item.po_order_id}</td>
                    <td>{LicSource[item.info_from]}</td>
                    <td class="">
                      {item.proposer}
                      <br></br>
                      {item.created_time}
                    </td>
                    <td>
                      <a
                        class={`pt-2 ${
                          LicSource.OA === item.info_from ? "hidden" : ""
                        }`}
                        onclick={(e) => {
                          this.dialogText = "删除";
                          document.getElementById("confirm")?.showModal();
                          List.forEach(
                            (_, index) => (List[index].checked = "")
                          );
                          e.target
                            .closest("tr")
                            .querySelector("input[type='checkbox']")
                            .setAttribute("checked", "checked");
                          List[index].checked = "checked";
                        }}
                        href="JavaScript:void(0);"
                      >
                        [删除]
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {List.length === 0 ? <p class="text-center">暂无内容</p> : ""}
        </div>
        <dialog id="confirm">
          <header>请确认</header>
          <p class="pt-2 pb-4">即将 [{this.dialogText}] 相关记录，是否继续?</p>
          <form method="dialog" class="space-x-2 flex justify-center">
            <button
              onclick={() => {
                Batch(this.dialogText);
              }}
            >
              继续
            </button>
            <button
              onclick={() => {
                List.forEach((_, index) => (List[index].checked = ""));
              }}
            >
              取消
            </button>
          </form>
        </dialog>
        <hr></hr>
        <div class="flex justify-between mt-4">
          <div>
            <a
              class="pt-2 "
              onclick={() => {
                if (!List.some((item) => item.checked === "checked")) {
                  MsgAdd(State.failed, "请至少选择一条记录");
                  return false;
                }
                this.dialogText = "批量生成";
                document.getElementById("confirm")?.showModal();
              }}
              href="JavaScript:void(0);"
            >
              [批量生成]
            </a>
          </div>
          <Pagination
            current={Page.current}
            total={Page.total}
            pageSize={Page.pageSize}
            onChange={PageChange}
          />
        </div>
      </>
    );
  },
};
