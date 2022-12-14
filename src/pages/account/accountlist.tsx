import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import { AccountState, DropState } from "@/model/account";
import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import { accountlist } from "./accdata";
import Sort, { SortEnum } from "@/coms/sort";

const topBar = Routes.find((item) => item.key === "sys");

const data = {
  id: "6666666",
  account: "admin",
  fullName: "刘星",
  state: "启用",
  roler: "主管",
  create: "2022-11-11",
  email: "jjjj@s2c.com.cn",
  phone: "9999999999",
};

const page = {
  current: 1,
  total: 20,
  pageSize: 10,
};

const pageChange = (pageNum: number, pageSize: number) => {
  // page.total = 1000;
  accountlist.data = 2;
  page.current = 5;
  page.pageSize = 20;
  console.log({ pageNum, pageSize });
};

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
          <select>
            <option>[账号状态]</option>
            {DropState.map((item) => (
              <option value={item[1]}>{item[0]}</option>
            ))}
          </select>
          <select>
            <option>[角色]</option>
            <option>主管</option>
            <option>员工</option>
          </select>
          <input type="input" class="w-36" placeholder="关键字搜索" />
          <button type="button" class="px-4" onclick={() => pageChange(1, 20)}>
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
              {[...Array(10)].map((i) => {
                return (
                  <tr>
                    <td class="">
                      <input class="ml-2 mt-1" type="checkbox" />
                    </td>
                    <td>
                      <blockquote class="my-0 not-italic py-1 p-2 min-h-[50px] h-full ">
                        {data.account}
                      </blockquote>
                    </td>
                    <td>{data.fullName}</td>

                    <td>{data.roler}</td>
                    <td>{data.email}</td>

                    <td>{data.phone}</td>
                    <td class="font-bold ">{data.state}</td>
                    <td>{data.create}</td>
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
            current={page.current}
            total={page.total}
            pageSize={page.pageSize}
            onChange={pageChange}
          />
        </div>
      </>
    );
  },
};
