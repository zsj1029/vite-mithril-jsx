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
          <p class="theme border-r-1 pt-2">
            <Leftmenu />
          </p>
          <p class="w-full min-w-300 h-full p-4 ">{children}</p>
        </p>
      </div>
    );
  },
};
