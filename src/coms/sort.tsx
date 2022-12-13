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
  let i = vnode.attrs.sort;
  // console.log(i);
  const swicthSort = () => {
    vnode.attrs.sortEvent(field, SortEnum[i]);
    i++;
    if (i === 3) i = 0;
  };

  return {
    view({ attrs }) {
      return (
        <div class="menu cursor-pointer select-none" onclick={swicthSort}>
          {attrs.value.name} {m(sortIcon[i])}
        </div>
      );
    },
  };
};
