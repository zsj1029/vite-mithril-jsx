import m from "mithril";

import { Profile, Theme } from "@/model/profile";

export default {
  oncreate(vnode) {},
  view: ({ attrs }) => (
    <>
      <div class={attrs.class}>
        <span
          class="cursor-pointer"
          onclick={() =>
            Profile.setTheme(Profile.theme ? Theme.dark : Theme.light)
          }
        >
          {Profile.getTheme() === Theme.dark ? "🌞" : "🌙"}
        </span>
      </div>
    </>
  ),
};
