import m from "mithril";
import { AccountItem } from "@/model/account";
import { Session, UpdtSession } from "@/model/session";
import { RoleList } from "@/model/common";
import Request, { Api } from "@/utils/request";
import { MsgAdd, State } from "@/coms/message";
import Password from "@/coms/password";
const Data: AccountItem & { loading: boolean } = Session();
Data.loading = false;
const UpdtPassword = async () => {
  if (
    (Data.password !== undefined || Data.rePwd !== undefined) &&
    Data.password !== Data.rePwd
  ) {
    alert("两次输入密码不一致，请确认");
    return;
  }
  await Request("post", Api.Password, Data);
  MsgAdd(State.success, "修改成功");
  delete Data.password, delete Data.rePwd;
  UpdtSession(Data);
};

export default {
  oncreate() {},
  view() {
    return (
      <>
        <div
          class="menu select-none  font-medium
                text-blue-500 cursor-none  pointer-events-none"
        >
          [修改密码]
        </div>
        <hr class="my-4"></hr>
        <form
          onsubmit={() => {
            UpdtPassword();
            return false;
          }}
          autocomplete="off"
        >
          <table class="mb-6 form-table">
            <tbody>
              <tr>
                <td class="">登录名</td>
                <td class="">
                  <div class="flex flex-col">
                    <input type="text" value={Data.username} disabled />
                    <span class="pt-1">
                      3-10位，只能由英文、数字、下划线的组成。
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>角色</td>
                <td>
                  <div class="flex flex-col w-72">
                    <select disabled value={Data.role}>
                      <option value={Session().role}>
                        {Session().role_zh}
                      </option>
                    </select>
                    <span class="pt-1">用户当前所属角色</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>密码</td>
                <td>
                  <div class="flex flex-col w-72">
                    <Password
                      value={Data.password}
                      oninput={(e) => (Data.password = e.target?.value)}
                      class="w-72 pr-5"
                      pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$"
                      minlength="6"
                      maxlength="20"
                      autocomplete="false"
                      placeholder="密码"
                    />
                    {/* <input
                      type="password"
                      pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$"
                      minlength="6"
                      maxlength="20"
                      oninput={(e) => (Data.password = e.target?.value)}
                    /> */}
                    <span class="pt-1">
                      6-20位，必须包含数字和英文 (留空表示不修改密码)
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>确认密码</td>
                <td>
                  <div class="flex flex-col w-72">
                    <Password
                      value={Data.rePwd}
                      oninput={(e) => (Data.rePwd = e.target?.value)}
                      class="w-72 pr-5"
                      pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$"
                      minlength="6"
                      maxlength="20"
                      autocomplete="false"
                      placeholder="确认密码"
                    />
                    <span class="pt-1"></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>员工姓名</td>
                <td>
                  <div class="flex flex-col">
                    <input
                      type="text"
                      value={Data.full_name}
                      oninput={(e) => (Data.full_name = e.target?.value)}
                      maxlength="16"
                    />
                    <span class="pt-1">员工姓名或标志性文本</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>邮箱地址*</td>
                <td>
                  <div class="flex flex-col">
                    <input
                      type="email"
                      required
                      pattern="(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$"
                      oninput={(e) => (Data.email = e.target?.value)}
                      value={Data.email}
                      maxlength="32"
                    />
                    <span class="pt-1">一个邮箱地址用于接受消息通知</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>电话</td>
                <td>
                  <div class="flex flex-col">
                    <input
                      type="tel"
                      pattern="([0-9-+]){6,16}$"
                      oninput={(e) => (Data.phone = e.target?.value)}
                      value={Data.phone}
                      minlength="6"
                      maxlength="16"
                    />
                    <span class="pt-1">联系电话，只允许数字和+、-符号</span>
                  </div>
                </td>
              </tr>
              {/* <tr>
                <td>启用账号</td>
                <td>
                  <div class="flex flex-col">
                    <input
                      type="checkbox"
                      style="width:1.3rem;height:1.3rem"
                      // class="w-10 h-10"
                      checked
                    />
                    <span class="pt-1">如不启用，则无法登录系统</span>
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <button type="submit" disabled={Data.loading}>
            保存
          </button>
        </form>
      </>
    );
  },
};
