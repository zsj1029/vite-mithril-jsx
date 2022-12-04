import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import account from "@/model/account";

window.onpopstate = (e) => {
  console.log(e);
};
export default {
  oninit() {
    // console.log(account);
  },
  oncreate() {
    // var dialog = document.getElementById("hello-dialog");
    // dialog.show();
  },
  view() {
    return (
      <>
        <h1 onclick={() => (account.data.bbb = 12312)}>All Account</h1>
        {/* <ui5-dialog id="hello-dialog" header-text="Register Form">
          <button>123123</button>
        </ui5-dialog> */}
      </>
    );
  },
};
