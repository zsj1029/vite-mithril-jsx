import m from "mithril";
import dialogPolyfill from "dialog-polyfill";
import { Data, LicCertType } from "@/model/license";

const data = {
  email: "",
  order_id: "",
};

export default {
  oncreate({ attrs }) {
    dialogPolyfill.registerDialog(
      document.getElementById("dialog") as HTMLDialogElement
    );
  },
  onbeforeupdate() {},
  view() {
    return (
      <dialog id="dialog" class="w-2/3">
        <header>许可证号：88888888</header>

        <form class="pt-2" method="dialog">
          <table class="mb-6 form-table form-info">
            <tbody>
              <tr>
                <td class="">授权对象*</td>
                <td class="">
                  <div class="flex flex-col">
                    {/* <input type="text" required /> */}
                    <span class="pt-1">{Data.customer}</span>
                  </div>
                </td>
                <td>PO单号</td>
                <td>
                  <div class="flex flex-col">
                    {/* <input type="text" /> */}
                    <span class="pt-1">{Data.po_order_id}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="">联系人*</td>
                <td colSpan="3">
                  <div class="flex flex-col">
                    {/* <input type="text" required /> */}
                    <span class="pt-1">{Data.name}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>邮箱地址*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="email" required /> */}
                    <span class="pt-1">{Data.email}</span>
                  </div>
                </td>
                <td>电话*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="tel" required /> */}
                    <span class="pt-1">{Data.phone}</span>
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
                    <span class="pt-1">{Data.product}</span>
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
                    <span class="pt-1">{LicCertType[Data.purpose]}</span>
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
                    <span class="pt-1">{Data.type}</span>
                  </div>
                </td>
                <td>可用席位</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="number" /> */}
                    <span class="pt-1">{Data.place}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>主机id*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <input type="text" required /> */}
                    <span class="pt-1">{Data.host_id}</span>
                  </div>
                </td>
                <td>有效期*</td>
                <td>
                  <div class="flex flex-col ">
                    {/* <select>
                      <option>[有效期]</option>
                      <option>30天</option>
                      <option>60天</option>
                      <option>90天</option>
                      <option>180天</option>
                      <option>1年</option>
                      <option>2年</option>
                      <option>3年</option>
                      <option>永久</option>
                    </select> */}
                    <span class="pt-1">{Data.validity_periods}</span>
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
                      value={Data.newEmail}
                      oninput={(e) => (Data.newEmail = e.target.value)}
                      required
                    />
                    <p class="pt-1 text-xs">用于接收许可证书的邮件地址</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="pt-2 mr-2"
            onclick={() => {
              console.log(Data);
              return false;
            }}
          >
            推送
          </button>
          <button
            class="pt-2 "
            onclick={() => document.getElementById("dialog").close()}
          >
            关闭
          </button>
        </form>
      </dialog>
    );
  },
};
