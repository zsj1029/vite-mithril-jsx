import m from "mithril";
import Header from "./header";
import Leftmenu from "./leftmenu";
export default {
  oncreate(vnode) {
    console.log("create...");
  },
  onupdate() {
    // console.log("update...");
  },
  view({ attrs, children, state }) {
    return (
      <div class="h-full flex flex-col justify-between">
        <Header />
        <p class="flex h-full">
          <p class="theme border-r pt-2">
            <Leftmenu />
          </p>
          <p class="grow min-w-[1100px] h-full p-4 ">{children}</p>
        </p>
      </div>
    );
  },
};
