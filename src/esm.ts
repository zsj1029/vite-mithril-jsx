import { Component } from "mithril";
import m, { Vnode } from "mithril";
import { User } from "./model";

export default {
	oninit: (vnode) => {
		console.log("esm.ts", vnode);
	},
	view: ({ attrs: { name, age, sex, s } }) =>
		m("main", [
			m("h1", { class: "text-xl" }, `${name},${age},${sex}`),
			m(
				"button",
				{
					onclick: () => {
						User.age = 9999;
					},
				},
				`other btn ${age}  ss:${s}`,
			),
		]),
	// view: () => <h1>hello h1</h1>,
};
