import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import {
  AccountState,
  DropState,
  GetData,
  List,
  Page,
  PageChange,
  Search,
} from "@/model/account";
import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import Sort, { SortEnum } from "@/coms/sort";
import { RoleList } from "@/model/common";

const topBar = Routes.find((item) => item.key === "sys");

const sortEvent = (sortField: string, order: string) => {
  console.log(sortField, order);
};

export default {
  input: "text",

  oninit() {
    // console.log(account);
    console.log(m.route.get());
  },
  oncreate() {
    if (Page.total === 0) {
      GetData();
    }
    // var dialog = document.getElementById("hello-dialog");
    // dialog.show();
    // console.log(123123);
  },
  view({ attrs }) {
    return (
      <>
        {/* {accountlist.data} */}
        <TopBar menus={topBar} />

        <form class="flex text-xs space-x-1.5 h-8">
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
          <button type="reset" class="px-4">
            重置
          </button>
        </form>
        <hr class="my-4"></hr>
        <div class="min-h-[675px]">
          <table class="mb-6 table-auto">
            <thead>
              <tr>
                <th class="w-10 ">
                  <a href="">全选</a>
                </th>
                <th>登录名</th>
                <th>全名</th>
                <th>角色</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>状态</th>
                <th>
                  <Sort
                    // key="days"
                    sort={SortEnum.none}
                    value={{ name: "创建时间", attr: "create" }}
                    sortEvent={sortEvent}
                  />
                </th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {List.map((item) => {
                return (
                  <tr>
                    <td class="">
                      <input class="ml-2 mt-1" type="checkbox" />
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
                      <a
                        class="pt-2 "
                        onclick={() => alert("修改")}
                        href="JavaScript:void(0);"
                      >
                        [修改]
                      </a>
                      &nbsp;
                      <a
                        class="pt-2 "
                        onclick={() => alert("删除")}
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
          <header>This is a sample dialog</header>
          <p>What is your favorite pet animal?</p>
          <menu>
            <button value="feline">Cats</button>
            <button value="canine">Dogs</button>
            <button value="other">Others</button>
          </menu>
        </dialog>
        <hr></hr>
        <div class="flex justify-between mt-4">
          <div>
            <a
              class="pt-2 "
              onclick={() => alert("生成")}
              href="JavaScript:void(0);"
            >
              [启用]
            </a>
            &nbsp;
            <a
              class="pt-2 "
              onclick={() => alert("生成")}
              href="JavaScript:void(0);"
            >
              [禁用]
            </a>
            &nbsp;
            <a
              class="pt-2 "
              onclick={() => alert("删除")}
              href="JavaScript:void(0);"
            >
              [删除]
            </a>
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
