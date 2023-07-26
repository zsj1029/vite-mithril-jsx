import m from "mithril";
import dialogPolyfill from "dialog-polyfill";
import { LicCertType, LicTypes } from "@/model/license";
import request, { Api } from "@/utils/request";
import { MsgAdd, State } from "@/coms/message";

export default {
  data: {
    order_id: "",
    email: "",
    loading: false,
  },
  oncreate({ attrs }) {
    dialogPolyfill.registerDialog(
      document.getElementById("dialog") as HTMLDialogElement
    );
  },
  onbeforeupdate() {},
  view({ attrs }) {
    return (
      <dialog id="mailPush" class="w-2/3 z-10">
        <header>许可证号：{attrs.Data.order_id}</header>

        <form
          class="pt-2"
          onsubmit={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <table class="mb-6 form-table form-info">
            <tbody>
              <tr>
                <td class="">授权对象*</td>
                <td class="">
                  <div class="flex flex-col">
                    {/* <input type="text" required /> */}
                    <span class="pt-1">{attrs.Data.customer}</span>
                  </div>
                </td>
                <td>PO单号</td>
                <td>
                  <div class="flex flex-col">
                    {/* <input type="text" /> */}
                    <span class="pt-1">{attrs.Data.po_order_id}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="">联系人*</td>
                <td colSpan="3">
                  <div class="flex flex-col">
                    {/* <input type="text" required /> */}
                    <span class="pt-1">{attrs.Data.name}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>邮箱地址*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="email" required /> */}
                    <span class="pt-1">{attrs.Data.email}</span>
                  </div>
                </td>
                <td>电话*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="tel" required /> */}
                    <span class="pt-1">{attrs.Data.phone}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <p>证书信息</p>

          <hr class="my-4"></hr>
          <table class="mb-6 form-table form-info">
            <tbody>
              <tr>
                <td class="">产品类型*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <select value="root">
                      <option>[产品]</option>
                      <option value="root">PPro xxxx</option>
                      <option value="manager">Neuro xxxx</option>
                    </select> */}
                    <span class="pt-1">{attrs.Data.product}</span>
                  </div>
                </td>
                <td>证书类型*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <select>
                      <option>[证书类型]</option>
                      <option>评估证书</option>
                      <option>售出证书</option>
                    </select> */}
                    <span class="pt-1">{LicCertType[attrs.Data.purpose]}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="">许可证类型*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <select>
                      <option>[许可证类型]</option>
                      <option>Node-Locked</option>
                      <option>Floating</option>
                    </select> */}
                    <span class="pt-1">
                      {LicTypes[attrs.Data.type?.toLocaleLowerCase()]}
                    </span>
                  </div>
                </td>
                <td>可用席位</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="number" /> */}
                    <span class="pt-1">
                      {attrs.Data.type?.toLocaleLowerCase() === "node-locked"
                        ? "N/A"
                        : attrs.Data.place}
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>主机id*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="text" required /> */}
                    <span class="pt-1">{attrs.Data.host_id}</span>
                  </div>
                </td>
                <td>有效期*</td>
                <td>
                  <div class="flex flex-col ">
                    <span class="pt-1">{attrs.Data.validity_periods}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>生效日期*</td>
                <td>
                  <div class="flex flex-col ">
                    <span class="pt-1">{attrs.Data.start_time}</span>
                  </div>
                </td>
                <td>到期日*</td>
                <td>
                  <div class="flex flex-col ">
                    <span class="pt-1">{attrs.Data.end_time}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <p>新邮件地址</p>
          <hr class="my-4"></hr>
          <table class="mb-6 form-table form-info">
            <tbody>
              <tr>
                <td class="">邮箱地址*</td>
                <td>
                  <div class="flex flex-col ">
                    <input
                      type="email"
                      value={attrs.Data.newEmail}
                      oninput={(e) => (attrs.Data.newEmail = e.target.value)}
                      required
                    />
                    <p class="pt-1 text-xs">用于接收许可证书的邮件地址</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <button
            class="pt-2 mr-2"
            disabled={this.data.loading}
            onclick={async () => {
              this.data.order_id = attrs.Data.order_id;
              this.data.email = attrs.Data.newEmail;
              try {
                await request("post", Api.LicensePush, this.data);
                document.getElementById("mailPush").close();
                MsgAdd(State.success, "推送成功");
              } catch (e) {
                alert(e.msg);
              }
            }}
          >
            推送
          </button>
          <button
            class="pt-2 "
            onclick={() => document.getElementById("mailPush").close()}
          >
            关闭
          </button>
        </form>
      </dialog>
    );
  },
};
