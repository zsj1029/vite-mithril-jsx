import { Menu } from "@/model/routeCfg";
import m, { Vnode } from "mithril";
import dialogPolyfill from "dialog-polyfill";
type Attrs = {
  menus: Menu;
};
let dialog: HTMLDialogElement | null;
export default {
  oncreate() {
    dialog = document.querySelector("dialog");
    dialogPolyfill.registerDialog(dialog as HTMLDialogElement);
  },
  view({ attrs }: Vnode<Attrs>) {
    return (
      <>
        {/* <dialog>
          I'm a dialog!
          <form method="dialog">
            <input type="submit" value="Close" />
          </form>
        </dialog>
        <button onclick={() => dialog.showModal()}>open</button> */}
        <div class="flex -ml-2">
          {attrs.menus.children?.map((item) => {
            const basePath = attrs.menus.path;
            if (item.action) {
              return (
                <div
                  onclick={() => m.route.set(basePath + item.path)}
                  class={`px-3 menu select-none border-l font-medium
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
