import m from "mithril";
import dialogPolyfill from "dialog-polyfill";
export default {
  oncreate({ attrs }) {
    dialogPolyfill.registerDialog(
      document.getElementById("dialog") as HTMLDialogElement
    );
  },
  view() {
    return (
      <dialog id="dialog" class="w-2/3">
        <header>许可证号：88888888</header>

        <form class="pt-2" method="dialog">
          <table class="mb-6 form-table">
            <tbody>
              <tr>
                <td class="">授权对象*</td>
                <td class="">
                  <div class="flex flex-col">
                    <input type="text" required />
                    <span class="pt-1">被许可授权的公司、组织或个人的全称</span>
                  </div>
                </td>
                <td>PO单号</td>
                <td>
                  <div class="flex flex-col">
                    <input type="text" />
                    <span class="pt-1">创建许可证的关联PO单</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="">联系人*</td>
                <td colSpan="3">
                  <div class="flex flex-col">
                    <input type="text" required />
                    <span class="pt-1">用于接受许可证的联系人姓名</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>邮箱地址*</td>
                <td>
                  <div class="flex flex-col ">
                    <input type="email" required />
                    <span class="pt-1">用于接收许可证文件的联系人邮箱地址</span>
                  </div>
                </td>
                <td>电话*</td>
                <td>
                  <div class="flex flex-col ">
                    <input type="tel" required />
                    <span class="pt-1">联系人电话</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <p>证书信息</p>

          <hr class="my-4"></hr>
          <table class="mb-6 form-table">
            <tbody>
              <tr>
                <td class="">产品类型*</td>
                <td>
                  <div class="flex flex-col ">
                    <select value="root">
                      <option>[产品]</option>
                      <option value="root">PPro xxxx</option>
                      <option value="manager">Neuro xxxx</option>
                    </select>
                    <span class="pt-1">待授权产品类型</span>
                  </div>
                </td>
                <td>证书类型*</td>
                <td>
                  <div class="flex flex-col ">
                    <select>
                      <option>[证书类型]</option>
                      <option>评估证书</option>
                      <option>售出证书</option>
                    </select>
                    <span class="pt-1">证书类型</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="">许可证类型*</td>
                <td>
                  <div class="flex flex-col ">
                    <select>
                      <option>[许可证类型]</option>
                      <option>Node-Locked</option>
                      <option>Floating</option>
                    </select>
                    <span class="pt-1">许可证类型</span>
                  </div>
                </td>
                <td>可用席位</td>
                <td>
                  <div class="flex flex-col ">
                    <input type="number" />
                    <span class="pt-1">Floating可用席位数量</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>主机id*</td>
                <td>
                  <div class="flex flex-col ">
                    <input type="text" required />
                    <span class="pt-1">
                      待绑定网卡MAC地址 如：70:B5:E8:4A:CA:3E
                    </span>
                  </div>
                </td>
                <td>有效期*</td>
                <td>
                  <div class="flex flex-col ">
                    <select>
                      <option>[有效期]</option>
                      <option>30天</option>
                      <option>60天</option>
                      <option>90天</option>
                      <option>180天</option>
                      <option>1年</option>
                      <option>2年</option>
                      <option>3年</option>
                      <option>永久</option>
                    </select>
                    <span class="pt-1">授权有效时长</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr class="my-4"></hr>
          <p>申请人</p>
          <hr class="my-4"></hr>
          <table class="mb-6 form-table">
            <tbody>
              <tr>
                <td class="">申请人*</td>
                <td>
                  <div class="flex flex-col ">
                    <input type="text" required />
                    <span class="pt-1">
                      本次许可证申请人（非制单人，如销售人员 张三；测试人员
                      李四）
                    </span>
                  </div>
                </td>
                <td class="">OA审批单编号</td>
                <td>
                  <div class="flex flex-col ">
                    <input type="text" required />
                    <span class="pt-1">OA审批单流水编号</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="pt-2"
            onclick={() => document.getElementById("dialog").close()}
          >
            关闭
          </button>
        </form>
      </dialog>
    );
  },
};
