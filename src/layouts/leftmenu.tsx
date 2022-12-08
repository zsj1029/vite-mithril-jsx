import m from "mithril";
import { Routes } from "@/model/routeCfg";
import { Arrow } from "@/coms/icon";

export default {
  oncreate() {
    document.querySelectorAll(".relative").forEach((ele) => {
      let show = true;
      ele.addEventListener("click", (e) => {
        // console.log(e.target.closest(".relative"));
        if (show) {
          e.target
            .closest(".relative")
            .nextElementSibling.classList.add("hidden");
          e.target
            .closest(".relative")
            .lastElementChild.classList.add("transform", "rotate-180");
        } else {
          e.target
            .closest(".relative")
            .nextElementSibling.classList.remove("hidden");
          e.target
            .closest(".relative")
            .lastElementChild.classList.remove("transform", "rotate-180");
        }
        show = !show;
      });
    });
  },
  onupdate(vnode) {
    console.log("update...");
  },
  view() {
    return (
      <>
        <div class="w-36 px-1 select-none ">
          {Routes.map((item) => {
            if (!item.children) {
              return (
                <ul>
                  <li
                    class={`menu ${
                      m.parsePathname(m.route.get()).path === item.path
                        ? "active"
                        : ""
                    } flex items-center py-2 px-4 overflow-hidden rounded transition duration-100 ease-in-out cursor-pointer`}
                    onclick={(e) => m.route.set(item.path, {})}
                  >
                    {item.icon}
                    {item.name}
                  </li>
                </ul>
              );
            } else {
              const basePath = item.path;
              return (
                <ul>
                  <li>
                    <span class="flex relative items-center py-2 px-4 overflow-hidden rounded transition duration-100 ease-in-out cursor-pointer">
                      {item.icon}
                      {item.name}
                      {Arrow}
                    </span>
                    <ul>
                      {item.children.map((v) => {
                        if (!v.hide) {
                          return (
                            <li
                              onclick={(e) =>
                                m.route.set(basePath + v.path, {})
                              }
                              class={`menu ${
                                m.parsePathname(m.route.get()).path ===
                                basePath + v.path
                                  ? "active"
                                  : ""
                              } flex items-center pl-9 py-2 cursor-pointer overflow-hidden rounded transition duration-100 ease-in-out`}
                            >
                              {v.name}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </li>
                </ul>
              );
            }
          })}
          <p class="fixed w-32 text-center bottom-4 ">Ver:1.0.0</p>
        </div>
      </>
    );
  },
};
