import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import account from "@/model/account";
import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";

const topBar = Routes.find((item) => item.key === "lic");

const page = {
  current: 1,
  total: 1000,
  pageSize: 10,
};

const data = {
  id: "6666666",
  po: "8888888",
  prod: "play2020 full edition",
  hostType: "Ethernet Mac",
  use: "Eval",
  hostid: "4d-5d-23-45-22-45",
  type: "Floating",
  age: "60days",
  seat: 20,
  end: "2023-12-12",
  apply: "2022-11-11 02:34:00",
  last: "13天",
};

// whitespace-pre overflow-auto

const pageChange = (pageNum: number, pageSize: number) => {
  // page.total = 1000;
  page.current = 5;
  page.pageSize = 20;
  console.log({ pageNum, pageSize });
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
        <TopBar menus={topBar} />
        <form class="flex space-x-1.5 text-xs h-8">
          <select>
            <option>[产品]</option>
            <option>PPro ver 1231123</option>
            <option>Neuro</option>
          </select>
          <select>
            <option>[证书类型]</option>
            <option>Eval</option>
            <option>Full</option>
          </select>
          <select>
            <option>[许可类型]</option>
            <option>Node-locked</option>
            <option>Floating</option>
          </select>
          {/* <select>
            <option>[状态]</option>
            <option>Current</option>
            <option>Expired</option>
          </select> */}
          <select>
            <option>[倒计时]</option>
            <option>&lt; 7日</option>
            <option>&lt; 30日</option>
            <option>&lt; 45日</option>
          </select>
          <input type="input" class="w-36" placeholder="关键字搜索" />
          <button type="submit" class="px-4">
            搜索
          </button>
          <button type="reset" class="px-4">
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
                  <a href="">全选</a>
                </th>
                <th>产品/客户</th>
                <th>许可证号</th>
                <th>主机id</th>
                <th>证书类型</th>
                <th>许可类型</th>
                <th>席位</th>
                <th>到期日</th>
                <th>倒计时</th>
                <th>已提醒</th>
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
                      <blockquote class="my-0 not-italic py-1 p-2 ">
                        {data.prod}

                        <footer class="border-t-0 pt-0">
                          <cite>Lenovo company </cite>
                        </footer>
                      </blockquote>
                    </td>

                    <td>{data.id}</td>

                    <td>{data.hostid}</td>
                    <td>{data.use}</td>
                    <td>{data.type}</td>
                    <td>{data.seat}</td>
                    <td class="font-medium ">{data.end}</td>
                    <td class="font-medium ">{data.last}</td>
                    <td>6次</td>
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
              [到期提醒]
            </a>
            &nbsp;
            <a
              class="pt-2 "
              onclick={() => alert("导出")}
              href="JavaScript:void(0);"
            >
              [数据导出]
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
