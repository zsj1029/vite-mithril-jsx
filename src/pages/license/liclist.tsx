import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import account from "@/model/account";
import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import Sort, { SortEnum } from "@/coms/sort";

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
  use: "评估",
  type: "Floating",
  seat: 20,
  age: "60days",
  apply: "2022-11-11 02:34:00",
  source: "OA",
};

// whitespace-pre overflow-auto

const pageChange = (pageNum: number, pageSize: number) => {
  page.total = 800;
  page.current = 5;
  page.pageSize = 20;
  console.log({ pageNum, pageSize });
  // console.log(SS.instance.attrs.resume());
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
  onremove() {
    console.log("remove ....");
  },
  view({ attrs }) {
    return (
      <>
        <TopBar menus={topBar} />
        <form class="flex text-xs space-x-1.5 h-8">
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
          <select>
            <option>[有效期]</option>
            <option>7日</option>
            <option>30日</option>
            <option>60日</option>
            <option>90日</option>
            <option>180日</option>
            <option>&gt;=1年</option>
          </select>
          <input type="input" class=" w-36" placeholder="关键字搜索" />
          <button type="button" class="px-4" onclick={() => pageChange(1, 20)}>
            搜索
          </button>
          <button type="reset" class="px-4">
            重置
          </button>
        </form>

        {/* </div> */}
        <hr class="my-4"></hr>
        <div class="min-h-[675px]">
          <table class="mb-6 table-auto  h-1">
            <thead class="select-none">
              <tr>
                <th class="w-10 ">
                  <a href="">全选</a>
                </th>
                <th>产品/客户</th>
                <th>许可证号</th>
                <th>证书类型</th>
                <th>许可类型</th>
                <th>证书类型</th>
                <th class="flex space-x-1 items-center">
                  <Sort
                    // key="days"
                    sort={SortEnum.none}
                    value={{ name: "有效期", attr: "days" }}
                    sortEvent={sortEvent}
                  />
                </th>
                <th>
                  <Sort
                    // key="po"
                    sort={SortEnum.none}
                    value={{ name: "PO单号", attr: "po" }}
                    sortEvent={sortEvent}
                  />
                </th>
                <th>来源</th>
                <th class="w-38">申请人</th>
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
                      <blockquote class="my-0 not-italic py-1 p-2 min-h-[50px]">
                        {data.prod}
                        <footer class="border-t-0 pt-0">
                          <cite>Lenovo company </cite>
                        </footer>
                      </blockquote>
                    </td>
                    <td>{data.id}</td>

                    <td>{data.use}</td>
                    <td>{data.type}</td>

                    <td>{data.seat}</td>
                    <td class="font-bold ">{data.age}</td>
                    <td>{data.po}</td>
                    <td>{data.source}</td>
                    <td class="">
                      liu xing<br></br>
                      {data.apply}
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
              [批量生成]
            </a>
            {/* &nbsp;
            <a
              class="pt-2 "
              onclick={() => alert("生成")}
              href="JavaScript:void(0);"
            >
              [全部生成]
            </a> */}
            {/* <a
              class="pt-2 "
              onclick={() => alert("导出")}
              href="JavaScript:void(0);"
            >
              [数据导出]
            </a> */}
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
