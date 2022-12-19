import { Menu } from "@/model/routeCfg";
import m, { Vnode } from "mithril";
type Attrs = {
  menus: Menu;
};
let dialog: HTMLDialogElement | null;
export default {
  oncreate() {},
  view({ attrs }: Vnode<Attrs>) {
    return (
      <>
        <div class="flex -ml-2">
          {attrs.menus.children?.map((item) => {
            const basePath = attrs.menus.path;
            if (item.action) {
              const hidden =
                (basePath + item.path).indexOf(
                  m.parsePathname(m.route.get()).path
                ) == -1
                  ? "hidden"
                  : "";
              return (
                <div
                  onclick={() => m.route.set(basePath + item.path)}
                  class={`px-3 menu ${hidden} select-none border-l font-medium
                ${
                  m.route.get() === basePath + item.path
                    ? "text-blue-500 cursor-none  pointer-events-none"
                    : "cursor-pointer"
                }`}
                >
                  [{item.name}]
                </div>
              );
            } else {
              return (
                <div
                  onclick={() => m.route.set(basePath + item.path)}
                  class={`px-2.5 menu select-none
                    ${
                      m.route.get() === basePath + item.path
                        ? "text-blue-500 cursor-none pointer-events-none"
                        : "cursor-pointer"
                    }`}
                >
                  {item.name}
                </div>
              );
            }
          })}
        </div>
        <hr class="my-4"></hr>
      </>
    );
  },
};
