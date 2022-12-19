import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import dialogPolyfill from "dialog-polyfill";
import {
  AccountState,
  Batch,
  CheckAll,
  CheckFlag,
  DropState,
  GetData,
  List,
  Page,
  PageChange,
  Reset,
  Search,
  SortAttrs,
  SortEvent,
} from "@/model/account";
import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import Sort, { SortEnum } from "@/coms/sort";
import { RoleList } from "@/model/common";
import { MsgAdd, State } from "@/coms/message";

const topBar = Routes.find((item) => item.key === "sys");

export default {
  dialogText: "删除",

  oninit() {
    // console.log(account);
    console.log(m.route.get());
  },
  oncreate({ attrs }) {
    if (Page.total === 0) {
      GetData();
    }
    dialogPolyfill.registerDialog(
      document.getElementById("dialog") as HTMLDialogElement
    );
  },
  view({ attrs }) {
    return (
      <>
        {/* {accountlist.data} */}
        <TopBar menus={topBar} />

        <form class="flex space-x-1.5 h-8">
          <select
            value={Search.status ?? ""}
            onchange={(e) => (Search.status = e.target.value)}
          >
            <option value="">[账号状态]</option>
            {DropState.map((item) => (
              <option value={item[0]}>{item[1]}</option>
            ))}
          </select>
          <select
            value={Search.role ?? ""}
            onchange={(e) => (Search.role = e.target.value)}
          >
            <option value="">[角色]</option>
            {RoleList.map((item) => (
              <option value={item.name}>{item.name_zh}</option>
            ))}
          </select>
          <input
            type="input"
            class="w-36"
            value={Search.keyword}
            oninput={(e) => (Search.keyword = e.target.value)}
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
          {console.log(Search.loading)}
          <table class={`mb-6 table-auto `}>
            <thead>
              <tr>
                <th class="w-10 ">
                  <a href="JavaScript:void(0);" onclick={CheckAll}>
                    全选
                  </a>
                </th>
                <th>登录名</th>
                <th>全名</th>
                <th>角色</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>
                  <Sort
                    order={SortAttrs.status}
                    value={{ name: "状态", attr: "status" }}
                    sortEvent={SortEvent}
                  />
                </th>
                <th>
                  <Sort
                    order={SortAttrs.create_time}
                    value={{ name: "创建时间", attr: "create_time" }}
                    sortEvent={SortEvent}
                  />
                </th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody class={`${Search.loading ? "blur-[2px]" : ""}`}>
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
                          // if (List.every((item) => item.checked === "checked"))
                          //   CheckFlag = true;
                        }}
                      />
                    </td>
                    <td>
                      <blockquote class="my-0 not-italic py-1 p-2 min-h-[50px] h-full ">
                        {item.username}
                      </blockquote>
                    </td>
                    <td>{item.full_name}</td>

                    <td>{item.role_name}</td>
                    <td>{item.email}</td>

                    <td>{item.phone}</td>
                    <td class="font-medium">{AccountState[item.status]}</td>
                    <td>{item.create_time}</td>
                    <td>
                      <a class="pt-2 " href="JavaScript:void(0);">
                        [修改]
                      </a>
                      &nbsp;
                      <a
                        class="pt-2 "
                        onclick={(e) => {
                          this.dialogText = "删除";
                          document.getElementById("dialog")?.showModal();
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
        </div>
        <dialog id="dialog">
          <header>请确认</header>
          <p class="pt-2 pb-4">即将 [{this.dialogText}] 相关记录，是否继续?</p>
          <form method="dialog" class="space-x-2">
            <button onclick={() => Batch(this.dialogText)}>继续</button>
            <button>取消</button>
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
                this.dialogText = "启用";
                document.getElementById("dialog")?.showModal();
              }}
              href="JavaScript:void(0);"
            >
              [启用]
            </a>
            &nbsp;
            <a
              class="pt-2 "
              onclick={() => {
                if (!List.some((item) => item.checked === "checked")) {
                  MsgAdd(State.failed, "请至少选择一条记录");
                  return false;
                }
                this.dialogText = "禁用";
                document.getElementById("dialog")?.showModal();
              }}
              href="JavaScript:void(0);"
            >
              [禁用]
            </a>
            &nbsp;
            {/* <a
              class="pt-2 "
              onclick={() => Batch("删除")}
              href="JavaScript:void(0);"
            >
              [删除]
            </a> */}
          </div>
          <Pagination
            class=""
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
