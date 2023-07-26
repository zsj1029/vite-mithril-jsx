import m from "mithril";
import { Routes } from "@/model/routeCfg";
import { Arrow } from "@/coms/icon";
import { Session } from "@/model/session";
import request, { Api, Sleep } from "@/utils/request";
import { SoonNum, WaitNum } from "@/model/common";

export default {
  routes: [],
  async oninit() {
    this.routes = [];
    const module = await request("get", Api.Modules);
    Routes.forEach((item) => {
      if (module.menu.includes(item.key)) this.routes.push(item);

      if (item.key === "password") this.routes.push(item);
    });
  },
  async oncreate() {
    await Sleep(1);
    document
      .getElementById("menu")
      ?.querySelectorAll(".relative")
      .forEach((ele) => {
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
  view() {
    return (
      <>
        <div id="menu" class="w-36 px-1 select-none ">
          {this.routes.map((item) => {
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
                                m
                                  .parsePathname(m.route.get())
                                  .path.indexOf(basePath + v.path) !== -1
                                  ? "active"
                                  : ""
                              } flex items-center pl-9 py-2 cursor-pointer overflow-hidden rounded transition duration-100 ease-in-out`}
                            >
                              {v.name}
                              {v.key === "wait" ? ` (${WaitNum ?? 0})` : ""}
                              {v.key === "soon" ? ` (${SoonNum ?? 0})` : ""}
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
          <p class="absolute w-32 text-center bottom-10 ">
            Ver:{Session().version}
          </p>
        </div>
      </>
    );
  },
};
