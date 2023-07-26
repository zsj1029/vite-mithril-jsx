import m from "mithril";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
import { ProductList } from "@/model/common";
import {
  Data,
  GetData,
  LicCertType,
  LicType,
  LicValidtime,
  SetData,
} from "@/model/license";
import request, { Api } from "@/utils/request";
import { MsgAdd, State } from "@/coms/message";

const topBar = Routes.find((item) => item.key === "authorization");

const CreateLic = async () => {
  // console.log(Data);
  Data.host_id = Data.host_id?.replace(/:|-/g, "").toLocaleUpperCase();
  await request("post", Api.LicenseCreate, Data);
  MsgAdd(State.success, "创建成功");
  Data.product_code = "";
  // UpdtSession(Data);
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
          autocomplete="off"
          onsubmit={(e) => {
            e.preventDefault();
            CreateLic();
            return false;
          }}
        >
          <table class="mb-6 form-table">
            <tbody>
              <tr>
                <td class="">授权对象*</td>
                <td class="">
                  <div class="flex flex-col">
                    <input
                      type="text"
                      maxlength="50"
                      value={Data.customer}
                      oninput={(e) => (Data.customer = e.target?.value)}
                      required
                    />
                    <span class="pt-1">被许可授权的公司、组织或个人的全称</span>
                  </div>
                </td>
                <td>PO单号</td>
                <td>
                  <div class="flex flex-col">
                    <input
                      type="text"
                      maxlength="64"
                      value={Data.po_order_id}
                      oninput={(e) => (Data.po_order_id = e.target?.value)}
                    />
                    <span class="pt-1">创建许可证的关联PO单</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="">联系人*</td>
                <td colSpan="3">
                  <div class="flex flex-col">
                    <input
                      type="text"
                      required
                      maxlength="32"
                      value={Data.name}
                      oninput={(e) => (Data.name = e.target?.value)}
                    />
                    <span class="pt-1">用于接收许可证的联系人姓名</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>邮箱地址*</td>
                <td>
                  <div class="flex flex-col ">
                    <input
                      type="email"
                      pattern="(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$"
                      oninput={(e) => (Data.email = e.target?.value)}
                      value={Data.email}
                      maxlength="32"
                      required
                    />
                    <span class="pt-1">用于接收许可证文件的联系人邮箱地址</span>
                  </div>
                </td>
                <td>电话*</td>
                <td>
                  <div class="flex flex-col ">
                    <input
                      type="tel"
                      pattern="([0-9-+]){6,16}$"
                      oninput={(e) => (Data.phone = e.target?.value)}
                      value={Data.phone}
                      minlength="6"
                      maxlength="16"
                      required
                    />
                    <span class="pt-1">联系人电话，只允许数字和+、-符号</span>
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
                    <select
                      required
                      value={Data.product_code ?? ""}
                      onchange={(e) => (Data.product_code = e.target.value)}
                      class="min-w-[120px]"
                    >
                      <option value="">[产品]</option>
                      {ProductList.map((item) => (
                        <option value={item.product_code}>
                          {item.product}
                        </option>
                      ))}
                    </select>
                    <span class="pt-1">待授权产品类型</span>
                  </div>
                </td>
                <td>证书类型*</td>
                <td>
                  <div class="flex flex-col ">
                    <select
                      required
                      value={Data.purpose ?? ""}
                      onchange={(e) => (Data.purpose = e.target.value)}
                    >
                      <option value="">[证书类型]</option>
                      {Object.values(LicCertType)
                        .filter((item) => typeof item !== "number")
                        .map((item, index) => (
                          <option value={index}>{item}</option>
                        ))}
                    </select>
                    <span class="pt-1">证书类型</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="">许可证类型*</td>
                <td>
                  <div class="flex flex-col ">
                    <select
                      value={Data.type ?? ""}
                      required
                      onchange={(e) => {
                        Data.type = e.target.value;
                        if (
                          e.target.value.toLocaleLowerCase() ===
                          LicType[0].toLocaleLowerCase()
                        ) {
                          document
                            .querySelector("#place")
                            ?.setAttribute("disabled", "true");
                          Data.place = "";
                          document
                            .querySelector("#place")
                            ?.removeAttribute("required");
                        } else {
                          document
                            .querySelector("#place")
                            ?.removeAttribute("disabled");
                          document
                            .querySelector("#place")
                            ?.setAttribute("required", "true");
                        }
                      }}
                    >
                      <option value="">[许可证类型]</option>
                      {LicType.map((item) => (
                        <option value={item.toLocaleLowerCase()}>{item}</option>
                      ))}
                    </select>
                    <span class="pt-1">许可证类型</span>
                  </div>
                </td>
                <td>可用席位</td>
                <td>
                  <div class="flex flex-col ">
                    <input
                      type="number"
                      id="place"
                      min="1"
                      max="99999"
                      value={Data.place ?? ""}
                      onchange={(e) => (Data.place = e.target.value)}
                    />
                    <span class="pt-1">Floating可用席位数量</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>主机id*</td>
                <td>
                  <div class="flex flex-col ">
                    <input
                      type="text"
                      value={Data.host_id ?? ""}
                      oninput={(e) =>
                        (Data.host_id = e.target.value.toLocaleUpperCase())
                      }
                      minlength="12"
                      pattern="((([A-F0-9]{2}:){5})|(([A-F0-9]{2}-){5})|(([A-F0-9]{2}){5}))[A-F0-9]{2}$"
                      maxlength="17"
                      required
                    />
                    <span class="pt-1">
                      待绑定网卡MAC地址 如：70:B5:E8:4A:CA:3E
                      (半角分隔符“:”或“-”,也可以没有)
                    </span>
                  </div>
                </td>
                <td>有效期*</td>
                <td>
                  <div class="flex flex-col ">
                    <select
                      required
                      value={Data.validity_periods ?? ""}
                      onchange={(e) => (Data.validity_periods = e.target.value)}
                    >
                      <option value="">[有效期]</option>
                      {LicValidtime.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
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
                    <input
                      type="text"
                      maxlength="20"
                      value={Data.proposer ?? ""}
                      oninput={(e) => (Data.proposer = e.target.value)}
                      required
                    />
                    <span class="pt-1">
                      本次许可证申请人（非制单人，如销售人员 张三；测试人员
                      李四）
                    </span>
                  </div>
                </td>
                <td class="">OA审批单编号</td>
                <td>
                  <div class="flex flex-col ">
                    <input
                      type="text"
                      maxlength="64"
                      value={Data.oa_order_id ?? ""}
                      oninput={(e) => (Data.oa_order_id = e.target.value)}
                    />
                    <span class="pt-1">OA审批单流水编号</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <hr class="my-4"></hr>
          <button type="submit" class="mr-2" disabled={Data.loading}>
            保存
          </button>

          <button type="reset" onclick={() => SetData()}>
            重置
          </button>
        </form>
      </>
    );
  },
};
