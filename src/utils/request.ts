import { MsgAdd, State } from "@/coms/message";
import m from "mithril";
export default async (
  method = "POST",
  url: string,
  data?: any
): Promise<any> => {
  let options = {
    method,
    url: "/openapi/s2c" + url,
  };
  const body = { ...data };
  delete body.loading;
  if (method.toLocaleUpperCase() === "GET" && url != Api.Random) {
    options = { ...options, ...{ params: body } };
  } else {
    options = {
      ...options,
      ...{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: new URLSearchParams(body),
      },
    };
  }
  let resp: { code: number; data: unknown; msg: string };
  if (data && "loading" in data) {
    data.loading = true;
  }
  // await Sleep(3);
  try {
    resp = await m.request(options);
    if (resp.code === 4005) {
      alert(resp.msg);
      m.route.set("/login", null, {
        replace: true,
      });
      return false;
    }

    if (resp.code !== 200) {
      window.document.querySelector(".messagebox")
        ? MsgAdd(State.failed, resp.msg)
        : alert(resp.msg);
      throw new Error(resp.msg);
    }
    return resp.data;
  } catch (e) {
    console.log(e.code);
    if (e.code) alert("接口异常，请稍后再试");
    throw e;
  } finally {
    if (data && "loading" in data) {
      data.loading = false;
    }
  }
};
// : Promise<{ code: number; data: unknown; msg: string }>

export const Sleep = async (sec: number) => {
  await new Promise((r) => setTimeout(r, sec * 1000));
};

export enum Api {
  Random = "/entry/nonce_str2/",
  Login = "/entry/login2/",
  Logout = "/entry/logout/",
  Roles = "/user_manage/role/list/",
  Password = "/user_manage/user/my_info/update/",
  AccountList = "/user_manage/user/list/",
  AccountState = "/user_manage/user/status/",
  AccountDelete = "/user_manage/user/del/",
  AccountAdd = "/user_manage/user/add/",
}
