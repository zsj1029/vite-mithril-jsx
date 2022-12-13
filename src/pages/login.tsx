import m from "mithril";
import Password from "@/coms/password";
import PerfersColor from "@/coms/perferscolor";

import MD5 from "crypto-js/md5";
import Base64 from "crypto-js/enc-base64";

const loginData = {
  account: "",
  password: "",
};

// e.preventDefault()
export default {
  oncreate({ attrs }) {
    // console.log(m.route.param());
    // console.log(attrs);
    // console.log(m.route.param());
  },
  view: ({ children }) => (
    <div class="h-full flex flex-col justify-center">
      <PerfersColor class="w-10 absolute right-2 top-2 text-xl" />
      <div class="flex mx-auto w-80 h-56 -mt-20 border rounded-md shadow-md flex-col justify-evenly items-center">
        <div class="w-60 text-left font-bold">用户支持系统（USS）</div>

        <input
          type="text"
          value={loginData.account}
          oninput={(e) => (loginData.account = e.target?.value)}
          class="w-60"
          placeholder="账号"
          autocomplete="false"
        />
        <Password
          oninput={(e) => (loginData.password = e.target?.value)}
          value={loginData.password}
          class="w-60"
          autocomplete="false"
          placeholder="密码"
        />
        <button
          class="w-60"
          onclick={() => {
            let pwd = "test1234";

            // let pp = Crypto.PBKDF2(pwd, pwd, {
            //   hasher: Crypto.algo.SHA256,
            //   // hasher:Crypto.algo.HMAC.create(CryptoJS.algo.SHA256, pwd)
            //   iterations: 390000,
            //   keySize: 8,
            // });

            // console.log(pp.toString(Crypto.enc.Base64));

            // console.log(window.btoa("test1234"));
            console.log(MD5(pwd).toString(Base64));
            m.route.set("/lic/list/wait");
            // alert("帐号或密码错误");
          }}
        >
          登录
        </button>
        {/* {m(
          m.route.Link,
          { href: "/login/222", params: { key: "value" } },
          "foo"
        )}
        {children} */}
      </div>
    </div>
  ),
};
