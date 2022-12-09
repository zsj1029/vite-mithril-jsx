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
      <div class="h-full min-w-[1200px] flex flex-col justify-between">
        <Header />
        <p class="flex h-full">
          <p class="theme border-r pt-2">
            <Leftmenu />
          </p>
          <p class="grow  h-full p-4 ">{children}</p>
        </p>
      </div>
    );
  },
};
