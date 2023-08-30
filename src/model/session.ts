import m from "mithril";
import Request, { Api } from "@/utils/request";
import Fetch from "@/utils/fetch";
import Utf8 from "crypto-js/enc-utf8";

import { encrypt } from "crypto-js/aes";
import { AccountItem } from "./account";
import { GetPrev } from "./common";

export type LoginData = {
  username: string;
  password: string;
  loading?: boolean;
};

export const Data = { loading: false } as LoginData;

// const vv = 'T2"$Qm2~{Jcc{0Mb';
const vv = [84, 50, 34, 36, 81, 109, 50, 126, 123, 74, 99, 99, 123, 48, 77, 98];

export const Login = async () => {
  // console.log(111111111111);
  const random = await Request("get", Api.Random, Data);
  // await Fetch(Api.Random, { method: "get" });
  const key = random.key;

  Data.password = encrypt(Data.password, Utf8.parse(key), {
    iv: Utf8.parse(new TextDecoder().decode(new Uint8Array(vv))),
  }).toString();
  try {
    const resp = await Request("post", Api.Login, Data);
    if (resp) UpdtSession(resp);
    m.route.set("/lic/list/wait", null, {
      replace: true,
    });
  } finally {
    Data.password = "";
  }
};

export const Logout = async () => {
  await Request("get", Api.Logout);
  localStorage.clear();
  GetPrev.clearTimer();
  window.location.href = "/";
  // m.route.set("/login");
};

//获取session
export const Session = (): AccountItem => {
  const sess = {};
  Object.keys(localStorage).forEach((key) => {
    sess[key] = localStorage[key];
  });
  return sess;
};
//更新session
export const UpdtSession = (account: AccountItem) => {
  Object.keys(account)?.forEach((key) => {
    localStorage[key] = account[key];
  });
};
