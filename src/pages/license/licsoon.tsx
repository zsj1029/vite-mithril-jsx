import m from "mithril";
import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import Sort from "@/coms/sort";
import {
  CheckAll,
  GetData,
  List,
  Page,
  PageChange,
  Reset,
  Search,
  SortAttrs,
  SortEvent,
  Batch,
  SetData,
  Data,
} from "@/model/licsoon";
import Confirm from "@/coms/confirm";
import { LicCertType, LicCountDown, LicType, LicTypes } from "@/model/license";
import { ProductList } from "@/model/common";
import { MsgAdd, State } from "@/coms/message";
import Licinfo from "./licinfo";
import Remind, { RemindDays } from "./remindSetting";
const topBar = Routes.find((item) => item.key === "authorization");

export default {
  dialogText: "",
  oncreate() {
    if (Page.total === 0) {
      GetData();
    }
  },
  view({ attrs }) {
    return (
      <>
        <Remind />
        <Licinfo Data={Data} />
        <Confirm actionText={this.dialogText} YES={Batch} List={List} />
        <TopBar menus={topBar} />
        <form class="flex space-x-1.5  h-8">
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
            value={Search.filters.countdown ?? ""}
            onchange={(e) => (Search.filters.countdown = e.target.value)}
          >
            <option value="">[倒计时]</option>
            {Object.entries(LicCountDown).map((item) => (
              <option value={item[1]}>{item[0]}</option>
            ))}
          </select>
          <input type="input" class="w-36" placeholder="关键字搜索" />
          <button type="button" class="px-4" onclick={GetData}>
            搜索
          </button>
          <button type="reset" onclick={Reset} class="px-4">
            重置
          </button>
        </form>

        {/* </div> */}
        <hr class="my-4"></hr>
        <div class="min-h-[675px]">
          <table class="mb-6 table-auto">
            <thead>
              <tr>
                <th class="w-10 ">
                  <a href="JavaScript:void(0);" onclick={CheckAll}>
                    全选
                  </a>
                </th>
                <th>产品/客户</th>
                <th>许可证号</th>
                <th>主机id</th>
                <th>证书类型</th>
                <th>许可类型</th>
                <th>席位</th>
                <th>
                  <Sort
                    order={SortAttrs.end_time}
                    value={{ name: "到期日", attr: "end_time" }}
                    sortEvent={SortEvent}
                  />
                </th>
                <th>
                  <Sort
                    order={SortAttrs.countdown}
                    value={{ name: "倒计时", attr: "countdown" }}
                    sortEvent={SortEvent}
                  />
                </th>
                <th>已提醒</th>
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
                      <blockquote class="my-0 not-italic py-1 p-2 ">
                        {item.product}
                        <footer class="border-t-0 pt-0">
                          <cite> {item.customer} </cite>
                        </footer>
                      </blockquote>
                    </td>

                    <td>
                      {" "}
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
                    <td class="font-medium ">{item.end_time}</td>
                    <td class="font-bold ">{item.countdown}天</td>
                    <td>{item.remind_time}次</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

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
                this.dialogText = "再次提醒";
                document.getElementById("confirm")?.showModal();
              }}
              href="JavaScript:void(0);"
            >
              [再次提醒]
            </a>
            &nbsp;
            <a
              class="pt-2 "
              onclick={() => document.querySelector("#remind")?.showModal()}
              href="JavaScript:void(0);"
            >
              [提醒策略({RemindDays}天)]
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
