import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
export default [
  {
    url: "/api/user",
    method: "get",
    response: (req: any) => {
      return {
        code: 0,
        data: {
          uuid: Mock.Random.string(32, 32),
          account: Mock.Random.name(),
          lastLogin: Mock.Random.datetime("2023-MM-dd"),
        },
        statusInfo: {
          message: "单个用户查询",
          errstack: "trackStack:xxxx error line 65",
        },
        req,
      };
    },
  },
  {
    url: "/api/user/login",
    method: "get",
    response: (req: any) => {
      return {
        code: 0,
        data: {
          token: Mock.Random.string(32, 32),
          user: {
            uuid: Mock.Random.string(32, 32),
            account: Mock.Random.name(),
            lastLogin: Mock.Random.datetime("2022-MM-dd"),
          },
        },
        statusInfo: {
          message: "帐号登录",
          errstack: "trackStack:xxxx error line 65",
        },
        req,
      };
    },
  },
  {
    url: "/api/user/password",
    method: "get",
    response: (req: any) => {
      return {
        code: 0,
        data: {},
        statusInfo: {
          message: "修改密码",
          errstack: "",
        },
        req,
      };
    },
  },
  {
    url: "/api/user/list",
    method: "get",
    response: (req: any) => {
      return {
        code: 0,
        data: Mock.mock({
          "list|5": [
            {
              uuid: Mock.Random.string(32, 32),
              "name|+1": ["admin", "user1", "user2"],
              "role|+1": ["管理员", "操作员"],
              lastLogin: Mock.Random.datetime("2022-MM-dd"),
            },
          ],
          count: 100,
          _current: 1,
        }),
        statusInfo: {
          message: "用户列表分页",
          errstack: "",
        },
        req,
      };
    },
  },
] as MockMethod[];
