import { Component } from "mithril";
import m, { Vnode } from "mithril";
import { User } from "./model";

type IUser = {
	name: string;
	age: number;
	sex: 1;
};
export default (): Component<IUser> => {
	return {
		oninit: ({ attrs }) => {
			console.log("hello1.tsx", attrs);
		},
		view: ({ attrs: { name, age, sex } }) =>
			m("main", { class: "hidden" }, [
				m("h1", { class: "text-xl" }, `${name},${age},${sex}`),
				m(
					"button",
					{
						onclick: () => {
							User.age = 9999;
						},
					},
					`other btn ${User.age}`,
				),
			]),
		// view: () => <h1>hello h1</h1>,
	};
};
