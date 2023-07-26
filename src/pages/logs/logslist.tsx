import m from "mithril";

import Pagination from "@/coms/pagination";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import { GetData, List, Page, PageChange, Reset, Search } from "@/model/logs";
// import { accountlist } from "./accdata";

const topBar = Routes.find((item) => item.key === "system");

export default {
  oncreate() {
    if (Page.total === 0) {
      GetData();
    }
  },
  view({ attrs }) {
    return (
      <>
        <TopBar menus={topBar} />

        <form
          onchange={GetData}
          onsubmit={() => false}
          class="flex space-x-1.5 h-8"
        >
          {/* <select>
            <option>[模块]</option>
            <option>用户</option>
            <option>许可证</option>
          </select>
          <select>
            <option>[事件]</option>
            <option>创建</option>
            <option>修改</option>
            <option>生成</option>
            <option>邮件发送</option>
          </select> */}
          {/* <select>
            <option>[角色]</option>
            <option>主管</option>
            <option>员工</option>
          </select> */}
          <div class="flex justify-between rounded items-center space-x-1 border-t border-b">
            <input
              class="w-[127px] h-8"
              type="date"
              value={Search.filters.start_time}
              onchange={(e) => (Search.filters.start_time = e.target.value)}
            />
            <span class="inline-block">&lt; 时间 &lt;</span>
            <input
              class="w-[127px] h-8"
              type="date"
              value={Search.filters.end_time}
              onchange={(e) => (Search.filters.end_time = e.target.value)}
            />
          </div>
          <input
            type="text"
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
        <div
          class={`${
            Search.loading ? "blur-[2px]" : ""
          } h-[675px] overflow-y-auto`}
        >
          <table class="mb-6 table-auto h-1">
            <thead>
              <tr>
                <th>事件</th>
                <th>内容</th>
                <th>结果</th>
                <th>角色</th>
                <th>帐号</th>
                <th>时间</th>
                <th>IP</th>
                <th>浏览器</th>
              </tr>
            </thead>
            <tbody>
              {List.map((item, index) => {
                return (
                  <tr>
                    <td>
                      <blockquote class="my-0 not-italic py-1 p-2 min-h-[50px] h-full ">
                        <strong>{item.module}</strong>
                        <footer class="border-t-0 pt-0">
                          <cite>{item.action} </cite>
                        </footer>
                      </blockquote>
                    </td>
                    <td class="whitespace-pre-line text-xs">{item.content}</td>
                    <td>
                      {item.status === 0 ? (
                        <span class="text-red-500">失败</span>
                      ) : (
                        "成功"
                      )}
                    </td>
                    <td>{item.role}</td>
                    <td>{item.who}</td>
                    <td>{item.time}</td>
                    <td>{item.ip}</td>
                    <td title={item.browser}>
                      <p class="w-40  truncate">{item.browser}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {List.length === 0 ? <p class="text-center">暂无内容</p> : ""}
        </div>

        <hr></hr>
        <div class="flex justify-between mt-4">
          <div></div>
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
