import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
export default [
  {
    url: "/openapi/s2c/entry/nonce_str2",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          key: Mock.Random.string(),
        },
        msg: "xxxxxx",
      };
    },
  },
  {
    url: "/openapi/s2c/entry/login2/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          username: "admin",
          full_name: "全名",
          email: "jazz@ads.com",
          phone: "1123123123",
          version: "1.0.1",
          role: "admin_role",
          role_zh: "管理员",
        },
        msg: "错误",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/entry/logout",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "未授权",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/entry/my_perms/",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          menu: ["authorization", "system"],
          permission: ["authorization", "system"],
        },
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/user_manage/role/hierarchy/",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          list: [
            { codename: "authorization", name: "授权管理" },
            { codename: "system", name: "系统管理" },
          ],
        },
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/product/list/",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          list: [
            { product: "产品1", product_classify: "大类", product_code: "xx" },
            { product: "产品2", product_classify: "大类", product_code: "yy" },
          ],
        },
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/info/",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          license_info:
            "S2C Limited Softwar e and/or Intellectual Property License File \n Issued 2022.1 2.21 \n HOST LIC-Server 0 01234567890 5053\nISV s2c \n \n#USE_SERVER \n \n VE NDOR s2c Limitedn# n# Lic ensed to lenovo \n Expiratio of 2023.03.31 nLICENS E s2c neuro 1.0 2023-03-311 0 hostid=ANY issuer=s2c\n customer=lenovo_ck=a84efc 6e96 sig=60P045398W2WK 935WICQEGWWISXCR4WY \n TKUVMXR22H5D1BTA3GASTPSXPMU3W9GWKRGEWXRΤΤΟ \n",
        },
        msg: "license download",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/input_license_info/",
    method: "delete",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "license delete",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/data_export/",
    method: "get",
    response: (req: any) => {
      return new Blob(["S2C Limited Softwar e and/or Intellectual Property"], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
    },
  },
  {
    url: "/openapi/s2c/license/license_create/",
    method: "post",
    response: (req: any) => {
      return {
        code: 201,
        data: {
          error_msg: "sssss错误",
          error_list: ["88888888", "9999999"],
        },
        msg: "license 生成失败",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/input_license_info/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "license create",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/push/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "license push",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/remind/",
    method: "put",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "license set remind",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/remind/",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          remind: 60,
        },
        msg: "license get remind",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/license/list/",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          total: 20,
          list: [
            {
              order_id: "88888888888888",
              license_id: "123",
              license_status: 1, //（0无效1有效）
              product: "xxxx 产品",
              product_code: "xx",
              po_order_id: "345346435",
              oa_order_id: "123123123",
              host_id: "70b4e84aca3e",
              purpose: 0, //证书类型
              type: "Floating", //许可证类型
              place: 10, //席位
              user: "admin", //制单人
              proposer: "销售张三", //申请人
              user_roler: "001",
              status: 0, //状态（0未生成1已生成）
              end_time: "2022-12-30", //到期日
              validity_periods: "60天", //有效天数
              created_time: "2022-11-11 08:12:12",
              info_from: 1, //（0：oa 1：录入）
              customer: "华为信息科技华为信",
              name: "刘星",
              phone: "17821111111",
              email: "xxx@xxx.com",
              countdown: 22, //倒计时
              remind_time: 2, //已提醒次数
              generate_time: "2022-11-11 08:12:12", //生成时间
            },
            {
              order_id: "88888888888888",
              license_id: "123",
              license_status: 0, //（0无效1有效）
              product: "xxxx 产品",
              product_code: "xx",
              po_order_id: "345346435",
              oa_order_id: "123123123",
              host_id: "70b4e84aca3e",
              purpose: 0, //证书类型
              type: "Node-Locked", //许可证类型
              place: "", //席位
              user: "admin", //制单人
              proposer: "销售张三", //申请人
              user_roler: "001",
              status: 0, //状态（0未生成1已生成）
              end_time: "2022-12-12", //到期日
              validity_periods: "60天", //有效天数
              created_time: "2022-11-11 08:12:12",
              info_from: 0, //（0：oa 1：录入）
              customer: "华为信息科技",
              name: "刘星",
              phone: "17821111111",
              email: "ssss@xxx.com",
              countdown: 22, //倒计时
              remind_time: 2, //已提醒次数
              generate_time: "2022-11-11 08:12:12", //生成时间
            },
          ],
        },
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/user_manage/role/list",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          list: [
            { name: "admin_role", scope: "", name_zh: "管理员" },
            { name: "manager_role", scope: "", name_zh: "主管" },
            { name: "member_role", scope: "", name_zh: "员工" },
          ],
        },
        msg: "",
        req,
      };
    },
  },

  {
    url: "/openapi/s2c/user_manage/user/my_info/update/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/user_manage/user/status/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/user_manage/user/del/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/user_manage/user/add/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/user_manage/user/update/",
    method: "post",
    response: (req: any) => {
      return {
        code: 200,
        data: {},
        msg: "",
        req,
      };
    },
  },
  {
    url: "/openapi/s2c/user_manage/user/list",
    method: "get",
    response: (req: any) => {
      return {
        code: 200,
        data: {
          total: 80,
          list: [
            {
              username: "admin",
              role_name: "管理员",
              role: "manager_role",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "active",
            },
            {
              username: "xx1",
              role_name: "主管",
              role: "manager_role",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "active",
            },
            {
              username: "xx2",
              role_name: "员工",
              role: "manager_role",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
            {
              username: "admin",
              role_name: "管理员",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
            {
              username: "xx1",
              role_name: "主管",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
            {
              username: "xx2",
              role_name: "员工",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
            {
              username: "admin",
              role_name: "管理员",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
            {
              username: "xx1",
              role_name: "主管",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
            {
              username: "xx2",
              role_name: "员工",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
            {
              username: "admin",
              role_name: "管理员",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "disactive",
            },
          ],
        },
        msg: "124234234",
        req,
      };
    },
  },
] as MockMethod[];
