import m from "mithril";
import dialogPolyfill from "dialog-polyfill";
export default {
  oncreate() {
    dialogPolyfill.registerDialog(
      document.getElementById("confirm") as HTMLDialogElement
    );
  },
  // onbeforeupdate({ attrs }) {},
  view({ attrs }) {
    return (
      <dialog id="confirm">
        <header>请确认</header>
        <p class="pt-2 pb-4">即将 [{attrs.actionText}] 相关记录，是否继续?</p>
        <form method="dialog" class="space-x-2 flex justify-center">
          <button onclick={() => attrs.YES(attrs.actionText)}>继续</button>
          <button
            onclick={() => {
              attrs.List.forEach(
                (_, index) => (attrs.List[index].checked = "")
              );
            }}
          >
            取消
          </button>
        </form>
      </dialog>
    );
  },
};
