import m, { Component, Vnode, VnodeDOM } from "mithril";

import { User } from "./model";

let aa = {
	x: 1,
	y: 2,
};
interface TT {
	t1: string;
	t2: string;
}

type Attrs = {
	pName: string;
	age: number;
};
type State = {
	count: number;
	at: TT;
};
//  :Component<Attrs, State>
export const HtmlEle = {
	count: 0,
	at: { t1: "123123" } as TT,
	oncreate: (vnode: Vnode<Attrs, State>) => {
		console.log(vnode);
	},
	view: ({ attrs, state, children: Children }: Vnode<Attrs, State>) => (
		<>
			<div class="bg-slate-100">
				<button
					id="test"
					onclick={() => {
						User.name = "new name";
						User.age = (Math.random() * 10000) | 0;
						User.sex = 123;
						aa.x++;
						state.count++;
						// at.t1 += "~!";
					}}
				>
					{attrs.pName},{attrs.age},{state.count}
					{aa.x}
					{/* <Children /> */}
				</button>
			</div>
		</>
	),
};
