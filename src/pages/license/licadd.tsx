import m from "mithril";
import { Routes } from "@/model/routeCfg";
import TopBar from "@/coms/topbar";
const topBar = Routes.find((item) => item.key === "lic");
export default {
  view() {
    return (
      <>
        <TopBar menus={topBar} />
        <h1>lic add</h1>
      </>
    );
  },
};
