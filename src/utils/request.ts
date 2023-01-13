import { MsgAdd, State } from "@/coms/message";
import m from "mithril";
export default async (
  method = "POST",
  url: string,
  data?: any,
  responseType = "json"
): Promise<any> => {
  let options = {
    method,
    url: import.meta.env.VITE_API_URL + "/openapi/s2c" + url,
    responseType,
    timeout: 5 * 1000,
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
  // console.log(data);
  // await Sleep(2);
  try {
    resp = await m.request(options);
    if (options.responseType === "blob") {
      console.log(options);
      return resp;
    }
    if (resp.code === 4005) {
      alert(resp.msg);
      // m.route.set("/login", null, {
      //   replace: true,
      // });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

      return false;
    }

    if (resp.code !== 200) {
      window.document.querySelector(".messagebox")
        ? MsgAdd(State.failed, resp.msg)
        : alert(resp.msg);
      delete resp.code;
      throw resp;
    }
    return resp.data;
  } catch (e) {
    console.log(e.code);
    //http code 异常
    if (e.code === 0) {
      window.document.querySelector(".messagebox")
        ? MsgAdd(State.failed, "网络异常")
        : alert("网络异常");
      // alert("网络异常");
    } else if (e.code > 0) {
      alert(`HTTP:${e.code} 接口异常`);
    }
    throw e;
    // if (e.code !== null) alert("接口异常，请稍后再试");
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
  Modules = "/entry/my_perms/",
  Roles = "/user_manage/role/list/",
  Products = "/product/list/",
  Password = "/user_manage/user/my_info/update/",
  AccountList = "/user_manage/user/list/",
  AccountState = "/user_manage/user/status/",
  AccountDelete = "/user_manage/user/del/",
  AccountAdd = "/user_manage/user/add/",
  AccountUpdate = "/user_manage/user/update/",
  LicenseList = "/license/list/",
  LicenseGenerate = "/license/license_create/",
  LicenseCreate = "/license/input_license_info/",
  LicensePush = "/license/push/",
  LicenseDownload = "/license/info/",
  LicenseExport = "/license/data_export/",
  LicenseDelete = "/license/input_license_info/",
  RemindGet = "/license/remind/",
  RemindSet = "/license/remind/",
  LicenseRemind = "/license/notices/",
  LogList = "/log/list/",
}

export function DeepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  const cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = DeepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

export const Download = (blob: Blob, fileName: string, mime: string) => {
  const blobs = new Blob([blob], {
    type: mime,
  });
  const link = document.createElement("a");
  link.download = `${fileName}`;
  link.href = URL.createObjectURL(blobs);
  link.click();
  URL.revokeObjectURL(link.href);
};
