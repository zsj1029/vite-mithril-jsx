import m from "mithril";

import { Profile, Theme } from "@/model/profile";

export default {
  oncreate(vnode) {},
  view: ({ attrs }) => (
    <>
      <div class={attrs.class}>
        <span
          class="cursor-pointer select-none"
          onclick={() =>
            Profile.setTheme(
              Profile.theme === Theme.light ? Theme.dark : Theme.light
            )
          }
        >
          {Profile.theme === Theme.dark ? "🌞" : "🌙"}
        </span>
      </div>
    </>
  ),
};
