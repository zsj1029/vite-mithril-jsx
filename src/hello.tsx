import m, { VnodeDOM } from "mithril";
import Mock from "mockjs";

export default (props?: number) => {
	let leftTime = {
		d: 0,
		h: 0,
		m: 0,
		s: 0,
	};
	let expiration = "0000/00/00";

	const trigger = () => {
		const uploadInput = document.getElementById("upload");
		uploadInput?.click();
		// x++;
	};

	const calTimeLeft = (endTime: string, refresh = 500) => {
		const dy = 86400;
		const hr = 3600;
		const min = 60;
		const end = Date.parse(endTime);
		expiration = new Date(endTime).toLocaleDateString();
		setInterval(() => {
			const leftSec = ((end - Date.now()) / 1000) | 0;
			const days = (leftSec / dy) | 0;
			const hours = ((leftSec - days * dy) / hr) | 0;
			const minutes = ((leftSec - days * dy - hours * hr) / min) | 0;
			const seconds = leftSec - days * dy - hours * hr - minutes * min;
			leftTime = {
				d: days,
				h: hours,
				m: minutes,
				s: seconds,
			};
			m.redraw();
		}, refresh);
	};

	return {
		oncreate: async (vnode: VnodeDOM) => {
			console.log(vnode.dom.querySelector("#upload"));
			let endTime;
			try {
				const resp: { code: number; data: { end: string } } = await m.request({
					method: "GET",
					url: "/api/get",
					params: { id: 1 },
					body: { name: "test" },
				});
				endTime = resp.data.end;
			} catch (e) {
				endTime = Mock.Random.date();
			}

			calTimeLeft(`${endTime} 00:00:00`, 500);
		},
		// oninit: () => {},
		view: () => (
			<>
				<div class="h-screen w-screen bg-slate-100 py-12 antialiased">
					<div class="w-1/2 max-w-[500px] min-w-[400px] h-full mx-auto flex flex-col justify-around  border-2 bg-yellow-100 shadow-lg border-green-500 border-dashed rounded-2xl">
						<p class=" text-gray-700 font-semibold text-center text-2xl">License Management</p>
						<p class="basis-3/5 rounded-xl drop-shadow-xl shadow-inner border-2 border-blue-200 bg-gray-700 sh text-white p-2 m-4 whitespace-pre overflow-auto">
							################################
							<br /> # Product: Prod 2022 # Product: Prod 2022
							<br /> # License type: Eval
							<br /> # Create by: Jayzz.Zhang
							<br /> # Address: jayzz@s2ceda.com
							<br /> # Mac: 3a-23-ss-33-44-55
							<br /> # Expiration: 2023/10/29 00:00:00
							<br />
							################################
							<br />
							################################
							<br /> # Product: Prod 2022
							<br /> # License type: Eval
							<br /> # Create by: Jayzz.Zhang
							<br /> # Address: jayzz@s2ceda.com
							<br /> # Mac: 3a-23-ss-33-44-55
							<br /> # Expiration: 2023/10/29 00:00:00
							<br />
							################################
						</p>
						<p class="basis-1/5 mt-1 text-center">
							<h2 class="font-mono  text-green-700">
								license expiration at: <span class="underline ">{expiration}</span>
							</h2>
							<h2 class="font-serif mt-4 text-red-500 tracking-widest">
								time left:&nbsp;
								<span class="underline font-thin">
									{leftTime.d}d·{leftTime.h}h·{leftTime.m}m·{leftTime.s}s
								</span>
							</h2>
						</p>
						<input id="upload" type="file" class="hidden" />
						<button
							onclick={() => trigger()}
							class="bg-green-600  hover:bg-green-700 mb-2 ring-offset-1 max-w-fit self-center border-green-400 ring-1 text-white p-2 rounded-xl text-sm"
						>
							Import Lic File
						</button>
					</div>
				</div>
			</>
		),
	};
};
