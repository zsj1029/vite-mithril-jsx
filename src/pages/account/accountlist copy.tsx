import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import account from "@/model/account";
import Pagination from "@/coms/pagination";

const page = {
  current: 1,
  total: 1000,
  pageSize: 10,
};
const topBar = [
  {
    path: "/lic/list/wait",
    name: "待生成(3)",
  },
  {
    path: "/lic/list/send",
    name: "已发送",
  },
  {
    path: "/lic/list/soon",
    name: "即将到期(1)",
  },
  {
    path: "/lic/list/expired",
    name: "已过期",
  },
];

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
        <div class="flex divide-x w-90 -ml-3">
          {topBar.map((item) => {
            return (
              <div
                onclick={() => m.route.set(item.path)}
                class={`px-3 select-none
              ${
                m.route.get() === item.path
                  ? "text-blue-500 cursor-none"
                  : "cursor-pointer"
              }`}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <hr class="my-4"></hr>

        {/* <div class="flex w-225 justify-between"> */}
        <form class="flex  space-x-2">
          <select>
            <option>[产品]</option>
            <option>PPro ver 1231123</option>
            <option>Neuro</option>
          </select>
          <select>
            <option>[用途]</option>
            <option>Eval</option>
            <option>Full</option>
          </select>
          <select>
            <option>[许可类型]</option>
            <option>Node-locked</option>
            <option>Floating</option>
          </select>
          <span>
            {/* <label class="pt-2">有效期</label> */}
            <input
              class="w-30 h-8.5"
              type={this.input}
              onblur={(e) => {
                this.input = "text";
              }}
              onfocus={(e) => {
                this.input = "date";
              }}
              placeholder="有效截止小于"
            />
          </span>
          <select>
            <option>[状态]</option>
            <option>Current</option>
            <option>Expired</option>
          </select>
          <input type="input" class="w-34" placeholder="关键字搜索" />
          <button type="submit" class="px-4">
            搜索
          </button>
          <button type="reset" class="px-4">
            重置
          </button>
        </form>
        {/* <a
            class="pt-2 "
            onclick={() => alert("导出")}
            href="JavaScript:void(0);"
          >
            [数据导出]
          </a> */}
        {/* </div> */}
        <hr class="my-4"></hr>
        <div class="min-h-97">
          <table class="mb-6 table-auto">
            <thead>
              <tr>
                <th class="w-10 ">
                  <a href="">全选</a>
                </th>
                <th>许可证号</th>
                <th>关联单号</th>
                <th>客户/产品</th>
                <th>用途</th>
                <th>许可类型</th>

                <th>状态</th>
                <th>有效截止</th>

                <th class="text-center">生成时间</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="">
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>

                <td>02323561</td>
                <td>02323564</td>
                <td>
                  Lenovo company <br></br> play 2022 xxxxx 12313123123123
                </td>
                <td>Full</td>
                <td>Node-Locked</td>

                <td>Current</td>
                <td class="font-bold break-keep">2023/01/01</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Eval</td>
                <td>Floating</td>

                <td>Expired</td>
                <td class="font-bold break-keep">2022/11/11</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Full</td>
                <td>Node-Locked</td>

                <td>Current</td>
                <td class="font-bold break-keep">2023/01/01</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Eval</td>
                <td>Floating/20</td>

                <td>Expired</td>
                <td class="font-bold break-keep">2022/11/11</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Full</td>
                <td>Node-Locked</td>

                <td>Current</td>
                <td class="font-bold break-keep">2023/01/01</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Eval</td>
                <td>Floating</td>

                <td>Expired</td>
                <td class="font-bold break-keep">2022/11/11</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Full</td>
                <td>Node-Locked</td>

                <td>Current</td>
                <td class="font-bold break-keep">2023/01/01</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Eval</td>
                <td>Floating</td>

                <td>Expired</td>
                <td class="font-bold break-keep">2022/11/11</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Full</td>
                <td>Node-Locked</td>

                <td>Current</td>
                <td class="font-bold break-keep">2023/01/01</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
              <tr>
                <td>
                  <input class="ml-2 mt-1" type="checkbox" />
                </td>
                <td>02323561</td>
                <td>02323564</td>
                <td>play 2022 xxxxx </td>
                <td>Eval</td>
                <td>Floating</td>

                <td>Expired</td>
                <td class="font-bold break-keep">2022/11/11</td>
                <td class="text-center">
                  admin<br></br>2022/10/11 08:22:23
                </td>
              </tr>
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
              [选中生成]
            </a>
            <a
              class="pt-2 "
              onclick={() => alert("生成")}
              href="JavaScript:void(0);"
            >
              [全部生成]
            </a>
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
