import m from "mithril";
// import { SortAsc, SortDesc, SortNone } from "./icon";
import { SortAsc, SortDesc, SortNone } from "@/coms/sorticon";
export enum SortEnum {
  none,
  asc,
  desc,
}
const sortIcon = [SortNone, SortAsc, SortDesc];

export default (vnode) => {
  const field = vnode.attrs.value.attr;
  let i = vnode.attrs.order;
  // console.log(i);
  const swicthSort = () => {
    i++;
    if (i === 3) i = 0;
    vnode.attrs.sortEvent(field, i);
  };

  return {
    onbeforeupdate({ attrs }, old) {
      // console.log(attrs.order, attrs.value.attr);
      if (old.attrs.order !== attrs.order) {
        i = attrs.order;
      }
    },
    view({ attrs }) {
      return (
        <div class="menu cursor-pointer select-none" onclick={swicthSort}>
          {attrs.value.name} {m(sortIcon[i])}
        </div>
      );
    },
  };
};
