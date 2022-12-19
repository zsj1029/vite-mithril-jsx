import m from "mithril";
const MsgSucc = (text: string) => (
  <p class="message w-52 px-6 flex items-center justify-center py-2 shadow-lg rounded-md border">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 inline-block text-green-600 -ml-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    &nbsp;
    <text title={text} class="truncate">
      {text}
    </text>
  </p>
);

const MsgFail = (text: string) => (
  <p class="message w-52 px-6 flex items-center justify-center py-2 shadow-lg rounded-md border">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 inline-block text-yellow-500 -ml-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    &nbsp;
    <text title={text} class="truncate">
      {text}
    </text>
  </p>
);

export enum State {
  success,
  failed,
}

const list: [{ state: State; text: string }] = [];

export const MsgAdd = (state = State.success, text: string) => {
  list.push({ state, text });
  setTimeout(() => {
    if (list.length) {
      list.shift();
      m.redraw();
    }
  }, 3500);
};

export default {
  view() {
    return (
      <>
        <p class="messagebox fixed flex flex-col space-y-2 top-2 items-center ">
          {list.map((value) => {
            {
              if (value.state === State.success) {
                return MsgSucc(value.text);
              } else {
                return MsgFail(value.text);
              }
            }
          })}
        </p>
      </>
    );
  },
};
