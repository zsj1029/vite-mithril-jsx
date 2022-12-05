import m from "mithril";
import { LeftArrow, RightArrow } from "@/coms/icon";

const pagination = {
  _current: 1, //当前页码
  _total: 50, //总记录数
  _pageCount: 100, //总页数
  _pageSize: 10, //页大小
  // _onchange: Object,
  set pageSize(num: number) {
    this._pageSize = Number(num);
    this._pageCount = Math.ceil(this._total / this._pageSize);
    this.current = 1;
  },
  set current(num: number) {
    this._current = Number(num);
    console.log("page change to " + this._current);
    this._onchange(this._current, this._pageSize);
  },
  set total(num: number) {
    this._total = Number(num);
    this._pageCount = Math.ceil(this._total / this._pageSize);
    if (this._current > this._pageCount) {
      this.current = this._pageCount;
    }
  },
  //后退按钮控制
  get prevBtn(): boolean {
    return this._current <= 1;
  },
  //前进按钮控制
  get nextBtn(): boolean {
    return this._current >= this._pageCount;
  },
};

//前后按钮点击prev next btn click
const PNClick = (num: number) => {
  if (
    pagination._current + num > 0 &&
    pagination._current + num <= pagination._pageCount
  ) {
    pagination.current = pagination._current + num;
  }
};

const oninput = (e) => {
  console.log("input...");
  if (e.target.value >= pagination._pageCount) {
    e.target.value = pagination._pageCount;
  }
  pagination._current = Number(e.target.value);
};

export default {
  oninit({ attrs }) {
    pagination._onchange = attrs.onchange;
    pagination.current = attrs.current ?? 1;
    pagination.total = attrs.total ?? 0;
    pagination.pageSize = attrs.pageSize ?? 10;
  },
  onbeforeupdate({ attrs }) {
    // pagination.current = attrs.current ?? 1;
    pagination.total = attrs.total ?? 0;
    // pagination.pageSize = attrs.pageSize ?? 10;
    // console.log("update.....");
    // console.log(attrs);
    // console.log(pagination);
  },
  view({ attrs }) {
    return (
      <>
        <div class="flex items-center w-90 justify-around">
          <span class="">共 {pagination._total ?? 0} 条</span>
          <button
            disabled={pagination.prevBtn}
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
            oninput={oninput}
            onfocus={(e) => e.target.select()}
            onchange={(e) => {
              pagination.current = e.target.value <= 1 ? 1 : e.target.value * 1;
            }}
            value={pagination._current}
          />
          <span>/</span>
          <span>{pagination._pageCount}</span>
          <button
            disabled={pagination.nextBtn}
            class="px-2"
            onclick={() => PNClick(1)}
          >
            {RightArrow}
          </button>

          <select
            onchange={(e) => (pagination.pageSize = e.target.value)}
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
