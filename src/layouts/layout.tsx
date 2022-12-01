import m from "mithril";
import Header from "./header";
import Leftmenu from "./leftmenu";
export default {
  oncreate(vnode) {
    console.log("create...");
  },
  onupdate() {
    console.log("update...");
  },
  view({ attrs, children, state }) {
    return (
      <>
        <Header />
        <p class="flex min-h-full ">
          <p class="min-h-full theme border-r-1 pt-2">
            <Leftmenu />
          </p>
          <p class="min-w-full min-h-full p-4">{children}</p>
        </p>
      </>
    );
  },
};
