import m from "mithril";
import "@/app.css";
import preact from "@/assets/preact.svg";

export default () => {
	// Local state ...
	let x = 1;
	const abc = {
		a: 1,
		b: [
			{
				name: 123,
				age: 123,
			},
			{
				name: 222,
				age: 222,
			},
		],
	};

	return {
		view: () => (
			<>
				<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
					<div class="shrink">
						<img class="h-12 w-12" src={preact} alt="ChitChat Logo" />
					</div>
					<div>
						<div class="text-xl  text-red-400">{abc.a}</div>
						<a href="#!/hello">Hello Url</a>
						<p class="text-slate-500">You have a new message!</p>
					</div>
				</div>
				<div class="p-8 max-w-sm mx-auto bg-slate-50 rounded-lg shadow-xl space-x-4 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
					<img class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={preact} alt="Woman's Face" />
					<div class="text-center space-y-2 sm:text-left">
						<div class="space-y-0.5">
							<p class="text-lg text-black font-semibold">Jayzz</p>
							<p class="text-slate-500 font-medium">Software Engineer</p>
						</div>
						<button
							onclick={() => {
								console.log(x);
								abc.a++;
								abc.b.push({ name: 66, age: 55 });
							}}
							class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
						>
							{abc.a}
						</button>
						<div class="focus-within:shadow-2xl shadow-black">
							<input type="text" />
						</div>
						{abc.b.map(({ name, age }, index) => (
							<span class="block">
								{name},{age},{index}
							</span>
						))}
					</div>
				</div>
			</>
		),
	};
};
