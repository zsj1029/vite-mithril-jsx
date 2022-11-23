import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
export default [
	{
		url: "/api/get",
		method: "get",
		response: async (req) => {
			await new Promise((r) => setTimeout(r, 3000));
			// console.log(req);
			return {
				code: 0,
				data: {
					name: Mock.Random.name(),
					query: req,
				},
			};
		},
	},
] as MockMethod[];
