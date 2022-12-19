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
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "active",
            },
            {
              username: "xx1",
              role_name: "主管",
              create_time: "2022-11-11",
              phone: "11111111",
              email: "xxx@sss.com",
              full_name: "的啊",
              status: "active",
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
        msg: "",
        req,
      };
    },
  },
] as MockMethod[];
