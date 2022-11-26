import m, { Vnode } from "mithril";

import { User } from "./model";

let aa = {
	x: 1,
	y: 2,
};
interface TT {
	t1: string;
	t2: string;
}

export const HtmlEle = {
	count: 0,
	at: { t1: "123123" } as TT,
	// onupdate: (vnode: Vnode) => {
	// 	console.log(vnode);
	// },
	view: ({ attrs: { pName }, state: { count, at: { t1 } } }: Vnode<{ pName: string }, { count: number; at: TT }>) => (
		<button
			id="test"
			onclick={() => {
				User.name = "new name";
				User.age = (Math.random() * 10000) | 0;
				User.sex = 123;
				aa.x++;
				count++;
				t1 += "~!";
			}}
		>
			{aa.x},{pName},{count},{t1}
		</button>
	),
};
