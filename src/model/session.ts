import m from "mithril";
import Request, { Api } from "@/utils/request";
import Utf8 from "crypto-js/enc-utf8";

import { encrypt } from "crypto-js/aes";
import { AccountItem } from "./account";

export type LoginData = {
  username: string;
  password: string;
  loading?: boolean;
};

export const Data = { loading: false } as LoginData;

const vv = "\x54\x32\x22\x24\x51\x6d\x32\x7e\x7b\x4a\x63\x63\x7b\x30\x4d\x62";
// const vv = 'T2"$Qm2~{Jcc{0Mb';

export const Login = async () => {
  const random = await Request("get", Api.Random, Data);
  const key = random.key;
  Data.password = encrypt(Data.password, Utf8.parse(key), {
    iv: Utf8.parse(vv),
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
  m.route.set("/login");
};

//获取session
export const Session = (): AccountItem => {
  let sess = {};
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
