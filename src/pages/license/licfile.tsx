import m from "mithril";
import dialogPolyfill from "dialog-polyfill";

let leftTime = {
  d: 0,
  h: 0,
  m: 0,
  s: 0,
};
let expiration = "0000/00/00";

let timer;

export const CountDown = (endTime: string, refresh = 500) => {
  const dy = 86400;
  const hr = 3600;
  const min = 60;
  const end = Date.parse(endTime);
  expiration = new Date(endTime).toLocaleDateString();
  console.log(end, Date.now());
  timer = setInterval(() => {
    let leftSec = ((end - Date.now()) / 1000) | 0;
    leftSec = leftSec > 0 ? leftSec : 0;
    const days = (leftSec / dy) | 0;
    const hours = ((leftSec - days * dy) / hr) | 0;
    const minutes = ((leftSec - days * dy - hours * hr) / min) | 0;
    const seconds = leftSec - days * dy - hours * hr - minutes * min;
    leftTime = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    };
    m.redraw();
  }, refresh);
};

export default {
  oncreate({ attrs }) {
    dialogPolyfill.registerDialog(
      document.getElementById("dialog") as HTMLDialogElement
    );
  },
  view({ attrs }) {
    return (
      <dialog id="licFile" class="pb-4">
        <header>许可证号：{attrs.Data.order_id}</header>

        <form class="pt-2">
          <div class="w-1/2 min-w-[400px] h-[600px] mx-auto flex flex-col justify-evenly  border-2 bg-yellow-100 shadow-lg border-green-500 border-dashed rounded-2xl">
            <p class=" text-gray-700 font-semibold text-center text-2xl">
              Certificate of License
            </p>
            <p
              class="h-3/5 w-[362px] rounded-xl drop-shadow-xl shadow-inner select-none -mt-2
             border-2 border-blue-200 bg-gray-700  text-white p-2 m-4 whitespace-pre-wrap break-words overflow-auto "
            >
              {attrs.Data.licContent}
            </p>
            <p class="mt-1 text-center">
              <h3 class="font-mono  text-green-700">
                license expiration at:
                <span class="underline ">{expiration}</span>
              </h3>
              <h3 class="font-serif mt-4 text-red-500 tracking-widest">
                time left:&nbsp;
                <span class="underline font-thin">
                  {leftTime.d}d·{leftTime.h}h·{leftTime.m}m·{leftTime.s}s
                </span>
              </h3>
            </p>
          </div>
          <button
            class="mt-4 mr-2"
            onclick={() => {
              clearInterval(timer);
              document.querySelector("#licFile")?.close();
            }}
          >
            关闭
          </button>
          <button
            class="mt-4"
            onclick={() => {
              if (attrs.Data.licContent.length === 0) {
                alert("证书下载失败");
                return;
              }
              const blob = new Blob([attrs.Data.licContent], {
                type: "text/plain",
              });
              const link = document.createElement("a");
              link.download = `${attrs.Data.customer}-${attrs.Data.product}-${attrs.Data.host_id}.lic`;
              link.href = URL.createObjectURL(blob);
              link.click();
              URL.revokeObjectURL(link.href);
              //   alert(attrs.Data.licContent);
            }}
          >
            下载
          </button>
        </form>
      </dialog>
    );
  },
};
