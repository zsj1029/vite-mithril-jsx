import m from "mithril";
// import "@ui5/webcomponents/dist/Dialog";
import account from "@/model/account";
import Pagination from "@/coms/pagination";

let num = 0;
const add = (a = 3) => {
  num += a;
};

const page = {
  current: 1,
  total: 1000,
  pageSize: 10,
};

const pageChange = (pageNum: number, pageSize: number) => {
  // page.total = 1000;
  page.current = 5;
  page.pageSize = 20;
  console.log({ pageNum, pageSize });
};

export default {
  oninit() {
    // console.log(account);
  },
  oncreate() {
    // var dialog = document.getElementById("hello-dialog");
    // dialog.show();
    // console.log(123123);
  },
  view() {
    return (
      <>
        <h1 onclick={() => (page.total = 400)}>{num}</h1>
        <Pagination
          current={page.current}
          total={page.total}
          pageSize={page.pageSize}
          onChange={pageChange}
        />
      </>
    );
  },
};
