import m from "mithril";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";

const topBar = Routes.find((item) => item.key === "sys");
export default {
  view() {
    return (
      <>
        <TopBar menus={topBar} />
        <form autocomplete="off">
          <table class="mb-6 form-table">
            <tbody>
              <tr>
                <td class="">登录名*</td>
                <td class="">
                  <div class="flex flex-col">
                    <input type="text" required />
                    <span class="pt-1">
                      用户名只能是英文、数字、下划线的组合。
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>角色*</td>
                <td>
                  <div class="flex flex-col w-60">
                    <select>
                      <option>[角色]</option>
                      <option>主管</option>
                      <option>员工</option>
                    </select>
                    <span class="pt-1">用户当前所属角色</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>密码*</td>
                <td>
                  <div class="flex flex-col w-60">
                    <input type="password" required />
                    <span class="pt-1">请输入一个6位以上的密码</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>确认密码*</td>
                <td>
                  <div class="flex flex-col w-60">
                    <input type="password" required />
                    <span class="pt-1">再重新输入一遍</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>全名</td>
                <td>
                  <div class="flex flex-col">
                    <input type="text" />
                    <span class="pt-1">员工姓名或标志性字符串</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>邮箱地址</td>
                <td>
                  <div class="flex flex-col">
                    <input type="text" />
                    <span class="pt-1">一个邮箱地址用于接受消息通知</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>电话</td>
                <td>
                  <div class="flex flex-col">
                    <input type="text" />
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
                      style="width:1.3rem;height:1.3rem"
                      // class="w-10 h-10"
                      checked
                    />
                    <span class="pt-1">如不启用，则无法登录系统</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <button type="submit">保存</button>
        </form>
      </>
    );
  },
};
