import m from "mithril";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import { Data, SetData, GetData } from "@/model/account";
import Password from "@/coms/password";
import { RoleList } from "@/model/common";
import request, { Api } from "@/utils/request";
import { MsgAdd, State } from "@/coms/message";

const topBar = Routes.find((item) => item.key === "system");

const CreateUser = async () => {
  console.log(Data);
  if (Data.password !== Data.rePwd) {
    alert("两次输入密码不一致，请确认");
    return;
  }
  const data = { ...Data };
  delete data.rePwd;
  await request("post", Api.AccountAdd, data);
  MsgAdd(State.success, "创建成功");
  delete Data.password, delete Data.rePwd;
  GetData();
};

export default {
  oninit() {
    SetData();
  },
  view() {
    return (
      <>
        <TopBar menus={topBar} />
        <form
          onsubmit={() => {
            e.preventDefault();
            CreateUser();
            return false;
          }}
          autocomplete="off"
        >
          <table class="mb-6 form-table">
            <tbody>
              <tr>
                <td class="">登录名*</td>
                <td class="">
                  <div class="flex flex-col">
                    <input
                      value={Data.username}
                      oninput={(e) => (Data.username = e.target?.value)}
                      type="text"
                      required
                      minlength="3"
                      maxlength="10"
                      pattern="^\w{3,10}$"
                    />
                    <span class="pt-1">
                      3-10位，只能由英文、数字、下划线的组成。
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>角色*</td>
                <td>
                  <div class="flex flex-col w-72">
                    <select
                      required
                      value={Data.role ?? ""}
                      onchange={(e) => (Data.role = e.target.value)}
                    >
                      <option value="">[角色]</option>
                      {RoleList.map((item) => (
                        <option value={item.name}>{item.name_zh}</option>
                      ))}
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
                      id="password"
                      value={Data.password}
                      oninput={(e) => (Data.password = e.target?.value)}
                      class="w-72 pr-5"
                      pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$"
                      minlength="6"
                      maxlength="20"
                      required
                      autocomplete="false"
                      placeholder="密码"
                    />
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
                      id="rePwd"
                      value={Data.rePwd}
                      oninput={(e) => (Data.rePwd = e.target?.value)}
                      class="w-72 pr-5"
                      required
                      pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$"
                      minlength="6"
                      maxlength="20"
                      autocomplete="false"
                      placeholder="确认密码"
                    />
                    <span class="pt-1">再次输入密码</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>全名</td>
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
                <td>邮箱地址</td>
                <td>
                  <div class="flex flex-col">
                    <input
                      type="email"
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
                      oninput={(e) => (Data.phone = e.target?.value)}
                      value={Data.phone}
                      minlength="6"
                      maxlength="16"
                    />
                    <span class="pt-1">联系电话</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>启用账号</td>
                <td>
                  <div class="flex flex-col">
                    <input
                      type="checkbox"
                      defaultChecked="checked"
                      onchange={(e) => {
                        Data.status = e.target.checked ? "active" : "disactive";
                      }}
                      style="width:1.3rem;height:1.3rem"
                      checked={Data.status === "active" ? "checked" : ""}
                    />
                    <span class="pt-1">如不启用，则无法登录系统</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <button type="submit" class="mr-2" disabled={Data.loading}>
            保存
          </button>

          <button type="reset">重置</button>
        </form>
      </>
    );
  },
};
