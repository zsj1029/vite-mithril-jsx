import m from "mithril";

export const hello = () => {
	return {
		view: () => m("main", [m("h1", { class: "text-xl" }, "hello page")]),
	};
};
