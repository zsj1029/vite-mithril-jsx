import m from "mithril";

export default (props?) => {
	let tt = 0;
	const THX = () => {
		switch (tt) {
			case 1:
				return <></>;
			case 0:
				return <>123</>;
			case 2:
				return <>333</>;
			default:
				return <>{tt}</>;
		}
	};
	return {
		oncreate: async () => {
			const resp = await m.request({
				method: "GET",
				url: "/api/get",
				params: { id: 1 },
				body: { name: "test" },
			});
			console.log(resp);
		},
		view: () => (
			<div class="h-screen w-screen bg-slate-100 py-12 antialiased">
				<div class="w-1/2 h-full mx-auto flex flex-col justify-end items-center border-4 bg-yellow-100 shadow-lg border-green-500 border-dashed rounded-2xl">
					<p class=" text-gray-700 font-semibold text- text-center  -mt-5 text-2xl">License Management</p>
					{(() => {
						switch (tt) {
							case 1:
								return <></>;
							case 0:
								return <>123</>;
							case 2:
								return <>333</>;
							default:
								return <>{tt}</>;
						}
					})()}
					<input type="file" class="hidden" />
					<button
						onclick={() => tt++}
						class="bg-green-600 hover:bg-green-700 mt-auto -mb-5 ring-offset-1 border-green-400 ring-2 text-white p-2 rounded-xl text-sm"
					>
						Import Lic File
					</button>
				</div>
			</div>
		),
	};
};
// let tt = true;
// const thx = () => {
//   if (tt) {
//     return m("label.label", "Last name");
//   } else {
//     return null;
//   }
// };
// export default {
//   view: () =>
//     m("form", [
//       m("button", { onclick: () => (tt = !tt) }, "add1"),
//       m("label", "first name"),
//       m("input.input[type=text][placeholder=First name]"),
//       thx(),
//     ]),
// };
