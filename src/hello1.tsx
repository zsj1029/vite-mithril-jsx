import { Component } from "mithril";
import m, { Vnode } from "mithril";
import { User } from "./model";

interface IUser {
	name: string;
	age: number;
	sex: 1;
}
export default (props: Vnode): Component<IUser> => {
	let cc: IUser = props.attrs;
	return {
		oninit: () => {
			console.log("hello1.tsx", cc.age);
			cc.age = 6666;
		},
		view: ({ attrs: { name, age, sex } }) =>
			m("main", [
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
