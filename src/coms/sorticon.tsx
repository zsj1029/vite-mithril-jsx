import m from "mithril";

export const SortDesc = () => {
  return {
    view({ attrs }) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 inline -mt-0.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
          />
        </svg>
      );
    },
  };
};

export const SortAsc = () => {
  return {
    view({ attrs }) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 inline -mt-0.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
          />
        </svg>
      );
    },
  };
};

export const SortNone = () => {
  return {
    view({ attrs }) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 inline -mt-0.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      );
    },
  };
};
