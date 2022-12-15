import m from "mithril";
import Password from "@/coms/password";
import PerfersColor from "@/coms/perferscolor";

import { Login, Data } from "@/model/session";

window.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") document.querySelector("form")?.submit();
});
// e.preventDefault()
export default {
  oncreate({ attrs }) {
    // console.log(m.route.param());
    // console.log(attrs);
    // console.log(m.route.param());
  },
  view: ({ children }) => (
    <div class="h-full flex flex-col justify-center">
      <PerfersColor class="w-10 absolute right-2 top-2 text-xl" />
      <form
        onsubmit={async () => {
          await Login();
          return false;
        }}
        class="flex mx-auto w-80 h-56 -mt-20 border rounded-md shadow-md flex-col justify-evenly items-center"
      >
        <div class="w-60 text-left font-bold">用户支持系统（USS）</div>
        <input
          type="text"
          required
          value={Data.username}
          oninput={(e) => (Data.username = e.target?.value)}
          class="w-60"
          placeholder="账号"
          autocomplete="false"
        />
        <input
          type="password"
          required
          value={Data.password}
          oninput={(e) => (Data.password = e.target?.value)}
          class="w-60"
          placeholder="密码"
          autocomplete="false"
        />
        {/* <Password
          oninput={(e) => (Data.password = e.target?.value)}
          value={Data.password}
          class="w-60 pr-5"
          autocomplete="false"
          placeholder="密码"
        /> */}
        <button type="submit" class="w-60" disabled={Data.loading}>
          登录
        </button>
        {/* {m(
          m.route.Link,
          { href: "/login/222", params: { key: "value" } },
          "foo"
        )}
        {children} */}
      </form>
    </div>
  ),
};
