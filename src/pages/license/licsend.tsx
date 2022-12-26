import m from "mithril";
import LicInfo from "@/pages/license/licinfo";
import LicInfoMail from "@/pages/license/licinfomail";
import LicFile, { CountDown } from "@/pages/license/licfile";
import dialogPolyfill from "dialog-polyfill";
import {
  SortEvent,
  Search,
  Reset,
  GetData,
  Page,
  List,
  SetData,
  SortAttrs,
  PageChange,
  Data,
  Export,
} from "@/model/licsend";

import {
  LicType,
  LicCertType,
  Batch,
  LicState,
  LicTypes,
} from "@/model/license";

import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import Sort from "@/coms/sort";
import { ProductList } from "@/model/common";
import { MsgAdd, State } from "@/coms/message";
import request, { Api } from "@/utils/request";

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
        <LicInfoMail Data={Data} />
        <LicFile Data={Data} />
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
            value={Search.filters.license_status ?? ""}
            onchange={(e) => (Search.filters.license_status = e.target.value)}
          >
            <option value="">[状态]</option>
            {Object.values(LicState)
              .filter((item) => typeof item !== "number")
              .map((item, index) => (
                <option value={index}>{item}</option>
              ))}
          </select>
          <div class="flex justify-between rounded items-center space-x-1 border-t border-b">
            <input
              class="w-[125px]  h-8"
              type="date"
              value={Search.filters.start_time}
              onchange={(e) => (Search.filters.start_time = e.target.value)}
            />
            <span class="inline-block">&lt; 生成时间 &lt;</span>
            <input
              class="w-[125px] h-8"
              type="date"
              value={Search.filters.end_time}
              onchange={(e) => (Search.filters.end_time = e.target.value)}
            />
          </div>
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
                  {/* <a href="JavaScript:void(0);" onclick={CheckAll}>
                    全选
                  </a> */}
                </th>
                <th>产品/客户</th>
                <th>许可证号</th>
                <th>主机id</th>
                <th>证书类型</th>
                <th>许可类型</th>
                <th>席位</th>
                <th>状态</th>
                <th>
                  <Sort
                    order={SortAttrs.validity_periods}
                    value={{ name: "到期日", attr: "validity_periods" }}
                    sortEvent={SortEvent}
                  />
                </th>
                {/* <th>关联单号</th> */}
                <th class="w-38">
                  <Sort
                    order={SortAttrs.create_time}
                    value={{ name: "生成时间", attr: "create_time" }}
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
                          List.forEach((item, i) => {
                            if (i === index)
                              item.checked =
                                item.checked === "checked" ? "" : "checked";
                            else item.checked = "";
                          });
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
                          SetData(item);
                          document.getElementById("dialog")?.showModal();
                        }}
                        href="JavaScript:void(0);"
                      >
                        {item.order_id}
                      </a>
                    </td>
                    <td>{item.host_id?.toLocaleUpperCase()}</td>
                    <td>{LicCertType[item.purpose]}</td>
                    <td>{LicTypes[item.type?.toLocaleLowerCase()]}</td>

                    <td>{item.place ? item.place : "N/A"}</td>
                    <td class="font-bold ">{LicState[item.license_status]}</td>
                    <td>{item.end_time}</td>

                    <td class="">
                      {item.user}
                      <br></br>
                      {item.created_time}
                    </td>
                    <td>
                      <a
                        class="pt-2 "
                        onclick={async () => {
                          const resp = await request(
                            "get",
                            Api.LicenseDownload,
                            { order_id: item.order_id }
                          );
                          CountDown(item.end_time ?? "0000/00/00");
                          item.licContent = resp.license_info;
                          SetData(item);
                          document.querySelector("#licFile")?.showModal();
                        }}
                        href="JavaScript:void(0);"
                      >
                        [证书下载]
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
                const data =
                  List.find((item) => item.checked === "checked") ?? {};
                data.newEmail = data?.email;
                SetData(data);
                document.getElementById("mailPush")?.showModal();
              }}
              href="JavaScript:void(0);"
            >
              [推送]
            </a>
            &nbsp;
            <a
              class="pt-2 "
              onclick={() => {
                Export();
              }}
              href="JavaScript:void(0);"
            >
              [数据导出]
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
