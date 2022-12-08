import m, { Vnode } from "mithril";
import { LeftArrow, RightArrow } from "@/coms/icon";

type Attrs = {
  total: number;
  current: number;
  pageSize: number;
  class?: string;
  onChange: any;
};

export default ({ attrs }: Vnode<Attrs>) => {
  const pagination = {
    _current: attrs.current ?? 1, //当前页码
    _total: attrs.total ?? 0, //总记录数
    _pageCount: 0, //总页数
    _pageSize: attrs.pageSize ?? 10, //页大小
  };
  //前进后退按钮控制
  const prevEnable = () => pagination._current <= 1;
  const nextEnable = () => pagination._current >= pagination._pageCount;

  pagination._pageCount =
    Math.ceil(pagination._total / pagination._pageSize) || 1;

  //按钮点击前进、后退 prev next btn click
  const PNClick = (num: number) => {
    if (
      pagination._current + num > 0 &&
      pagination._current + num <= pagination._pageCount
    ) {
      pagination._current += num;
      attrs.onChange(pagination._current, pagination._pageSize);
    }
  };
  // 输入页码校验拦截
  const textInput = (e) => {
    console.log("input...");
    if (e.target.value >= pagination._pageCount) {
      e.target.value = pagination._pageCount;
    }
    pagination._current = Number(e.target.value);
  };
  // 文本框变动跳转页面
  const textChange = (e) => {
    pagination._current = e.target.value <= 1 ? 1 : e.target.value * 1;
    attrs.onChange(pagination._current, pagination._pageSize);
  };
  //更改页大小
  const selectChange = (e) => {
    pagination._pageSize = e.target.value;
    pagination._pageCount = Math.ceil(pagination._total / pagination._pageSize);
    pagination._current = 1;
    attrs.onChange(pagination._current, pagination._pageSize);
  };

  return {
    //外部更新重新计算属性
    onbeforeupdate({ attrs }: Vnode<Attrs>, old) {
      // console.log(attrs);
      pagination._total = attrs.total;
      pagination._pageCount =
        Math.ceil(pagination._total / pagination._pageSize) || 1;
      if (pagination._current > pagination._pageCount) {
        pagination._current = pagination._pageCount;
      }
      //外部直接修改current,判断并跳转
      if (old.attrs.current !== attrs.current) {
        console.log(attrs.current, old.attrs.current);
        pagination._current = attrs.current;
        attrs.onChange(pagination._current, pagination._pageSize);
      }
    },
    view({ attrs }: Vnode<Attrs>) {
      return (
        <>
          <div
            class={`${attrs.class} flex items-center space-x-2 justify-around `}
          >
            <span class="">共 {attrs.total ?? 0} 条</span>
            <button
              disabled={prevEnable()}
              class="px-2"
              onclick={() => PNClick(-1)}
            >
              {LeftArrow}
            </button>
            <input
              type="number"
              min="1"
              max={pagination._pageCount}
              class="w-14  py-1 text-center"
              oninput={textInput}
              onfocus={(e) => e.target.select()}
              onchange={textChange}
              value={pagination._current}
            />
            <span>/</span>
            <span>{pagination._pageCount}</span>
            <button
              disabled={nextEnable()}
              class="px-2"
              onclick={() => PNClick(1)}
            >
              {RightArrow}
            </button>

            <select
              onchange={selectChange}
              value={pagination._pageSize}
              class="text-center py-1"
            >
              <option value="10">10/页</option>
              <option value="20">20/页</option>
              <option value="50">50/页</option>
              <option value="100">100/页</option>
            </select>
          </div>
        </>
      );
    },
  };
};
