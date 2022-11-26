import m from "mithril";

import { User } from "./model";

export default () => {
	return {
		view: () => (
			<button
				id="test"
				class="hidden"
				onclick={() => {
					User.name = "1111";
					User.age = (Math.random() * 10000) | 0;
				}}
			>
				{User.age}
			</button>
		),
	};
};
