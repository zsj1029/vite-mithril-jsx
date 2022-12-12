import m from "mithril";
import Header from "./header";
import Leftmenu from "./leftmenu";

const Msg = (text: string) => (
  <p class="message w-52 px-6 flex items-center justify-center py-2 shadow-lg rounded-md border">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 inline-block text-green-600 -ml-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    &nbsp;
    <text title={text} class="truncate">
      {text}
    </text>
  </p>
);

const ll = ["操作成功", "操作失败", "异常：xxxxx异常：xxxxx"];
// setInterval(() => {
//   if (ll.length) {
//     ll.shift();
//     m.redraw();
//   }
// }, 2000);

export default {
  oncreate(vnode) {
    console.log("create...");
  },
  onupdate() {
    // console.log("update...");
  },
  view({ attrs, children, state }) {
    return (
      <>
        <p class="messagebox fixed flex flex-col space-y-2 top-2 items-center">
          {ll.map((value) => {
            return Msg(value);
          })}
        </p>
        <button onclick={() => ll.push("xxxxx")}>add</button>
        <div class="h-full min-w-[1200px] flex flex-col justify-between ">
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
