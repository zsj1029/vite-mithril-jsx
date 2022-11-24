import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
export default [
	{
		url: "/api/get",
		method: "get",
		response: (req) => {
			return {
				code: 0,
				data: {
					name: Mock.Random.name(),
					end: Mock.Random.datetime("2023-MM-dd"),
				},
			};
		},
	},
] as MockMethod[];
