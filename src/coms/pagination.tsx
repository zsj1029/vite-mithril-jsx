import m from "mithril";

export default {
  view({ attrs }) {
    return (
      <>
        <button onclick={() => attrs.onchange()}>add +1 </button>
        <button onclick={() => history.back()}>back </button>
        <button onclick={() => m.route.set("/lic/list/wait")}>go to </button>
      </>
    );
  },
};
