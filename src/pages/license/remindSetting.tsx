import m from "mithril";
import dialogPolyfill from "dialog-polyfill";
import request, { Api } from "@/utils/request";
import { MsgAdd, State } from "@/coms/message";

export let RemindDays = 60;

export const GetRemind = async () => {
  const resp = await request("get", Api.RemindGet);
  RemindDays = resp.remind;
};

const data = {
  remind: 0,
  loading: false,
};
export const SetRemind = async () => {
  const v = document.querySelector("#remindInput")?.value;
  data.remind = v;
  await request("post", Api.RemindSet, data);
  MsgAdd(State.success, "操作成功");
  RemindDays = v;
  document.querySelector("#remind")?.close();
};

export default {
  oncreate() {
    dialogPolyfill.registerDialog(
      document.getElementById("confirm") as HTMLDialogElement
    );
    GetRemind();
  },

  view({ attrs }) {
    return (
      <dialog id="remind">
        <header>修改提醒策略</header>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            SetRemind();
            return false;
          }}
        >
          <p class="pt-2 pb-4 flex items-center">
            许可证到期前&nbsp;&nbsp;
            <input
              id="remindInput"
              type="number"
              value={RemindDays}
              class="w-16 text-center"
              min="5"
              required
              max="90"
            />
            &nbsp;&nbsp;天(设置范围5-90)，发送邮件提醒。
          </p>
          <p class="space-x-2 flex justify-center">
            <button type="submit" disabled={data.loading}>
              修改
            </button>
            <button onclick={() => document.querySelector("#remind")?.close()}>
              取消
            </button>
          </p>
        </form>
      </dialog>
    );
  },
};
