import m from "mithril";
import { Component } from "mithril";
import { User } from "./model";

let aa = {
	x: 1,
	y: 2,
};

export default {
	view: ({ attrs: { name, age } }) => (
		<button
			id="test"
			onclick={() => {
				User.name = "1111";
				User.age = (Math.random() * 10000) | 0;
				User.sex = 123;
				aa.x++;
			}}
		>
			{aa.x},{name}
		</button>
	),
};
