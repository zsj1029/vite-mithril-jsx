import m from "mithril";
import Header from "./header";
import Leftmenu from "./leftmenu";
import Message, { MsgAdd, State } from "@/coms/message";
import { GetRoles } from "@/model/common";

export default {
  oncreate(vnode) {
    //登录后系统初始化获取相关下拉框列表
    GetRoles();
    console.log("create...");
  },
  onupdate() {
    // console.log("update...");
  },
  view({ attrs, children, state }) {
    return (
      <>
        <Message />
        {/* <button onclick={() => MsgAdd(State.success, "xxxxx")}>add</button> */}
        <div class="h-full min-w-[1240px] flex flex-col justify-between ">
          <Header />
          <p class="flex h-full ">
            <p class="theme border-r pt-2">
              <Leftmenu />
            </p>
            <p class="grow  h-full p-4 ">{children}</p>
          </p>
        </div>
      </>
    );
  },
};
