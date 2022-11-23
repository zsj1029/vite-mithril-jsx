import { onMount, createSignal, createMemo, createEffect, For, Index } from "solid-js";

// import "@/app.css";
import { Rect } from "konva/lib/shapes/Rect";
import { Stage } from "konva/lib/Stage";
import { Layer } from "konva/lib/Layer";
import preact from "./assets/preact.svg";
// import "@ui5/webcomponents/dist/Button";
// import "@ui5/webcomponents/dist/Table";
// import "@ui5/webcomponents/dist/TableColumn";
// import "@ui5/webcomponents/dist/TableCell";
// import "@ui5/webcomponents/dist/TableRow";

export type Item = {
	id: string;
	name: string;
};

export default () => {
	const [count, setCount] = createSignal(0);
	const doubleCount = createMemo(() => {
		console.log("memo one");
		return count() * 2;
	});

	const [cats, setCats] = createSignal([
		{ id: "J---aiyznGQ", name: "Keyboard Cat" },
		{ id: "z_AbfPXTKms", name: "Maru" },
		{ id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
	]);

	const addItem = (item: Item) => {
		setCats((prev) => {
			// prev.shift();
			prev[0] = { name: "111111", id: "1111111" };
			return [...prev, item];
		});
	};
	createEffect(() => {
		console.log(cats().at(0));
		// setCats([...cats(), { name: "111", id: "asdasd" }]);
		// setCats((prev) => {
		//   console.log(prev.);
		// });
	});

	return (
		<>
			<div class="header">
				<span>Products table - resize your browser to make some columns pop-in</span>
				<button id="toggleSticky" style="height: 32px">
					Toggle Sticky Column Header
				</button>
			</div>
			<div class="columns-3 ">
				<p>Well, let me tell you something, ...</p>
				<p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>
				<p>Maybe we can live without...</p>
				<p>Look. If you think this is...</p>
			</div>
			<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
				<div class="shrink">
					<img class="h-12 w-12" src={preact} alt="ChitChat Logo" />
				</div>
				<div>
					<div class="text-xl  text-black">ChitChat</div>
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
					<button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
						Message
					</button>
					<div class="focus-within:shadow-2xl shadow-black">
						<input type="text" />
					</div>
				</div>
			</div>
			<div class="md:container md:mx-auto px-4">1231</div>

			<div class="p-4">
				<div class="flow-root">
					<div class="my-4">Well, let me tell you something, ...</div>
				</div>
				<div class="flow-root">
					<div class="my-4">Sure, go ahead, laugh if you want...</div>
				</div>
			</div>
			<div class="flex max-w-sm mx-auto brightness-100 items-center p-6 shadow-lg rounded-lg">
				<img src={preact} class="w-12 h-12 m-4" alt="preact" />
				<div>
					<strong class="block">Andrew alfsxc</strong>
					<span class="block">Tech advistor</span>
				</div>
			</div>
			<p>
				Today I spent most of the day researching ways to ...
				<span class="max-w-sm inline-flex items-baseline">
					<img src={preact} alt="" class="self-center w-5 h-5 rounded-full mx-1" />
					<span>Kramer</span>
				</span>
				keeps telling me there is no way to make it work, that ...
			</p>

			<div class="columns-3 hover:columns-3">
				<img class="w-full aspect-video " src={preact} />
				<img class="w-full aspect-square " src={preact} />
				<img class="w-full aspect-[21/9] " src={preact} />
				<img class="w-full aspect-video " src={preact} />
				<img class="w-full aspect-video " src={preact} />
				<img class="w-full aspect-video " src={preact} />
			</div>
			<div class="columns-2">
				<p>Well, let me tell you something, ...</p>
				<p class="break-after-all">Sure, go ahead, laugh...</p>
				<p>Maybe we can live without...</p>
				<p>Look. If you think this is...</p>
			</div>
			{cats().map(({ name, id }, index) => {
				return (
					<div>
						{/* {() => {*/}
						{/*  console.log(id);*/}
						{/*  return null;*/}
						{/*}} */}
						{name},{id},{index}
					</div>
				);
			})}

			<For each={cats()}>
				{(cat, i) => (
					<li>
						<a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`} rel="noreferrer">
							{() => {
								console.log(`for ${cat.id} ${cat.name}`);
								return null;
							}}
							{cat.id}: {cat.name}
						</a>
					</li>
				)}
			</For>
			<Index each={cats()}>
				{(cat, i) => (
					<li>
						<a target="_blank" href={`https://www.youtube.com/watch?v=${cat().id}`} rel="noreferrer">
							{() => {
								console.log(`index ${cat().id}`);
								return null;
							}}
							{cat().id}: {cat().name}
						</a>
					</li>
				)}
			</Index>
			<div id="container" style={{ display: "none" }} />
			<div class="card">
				<button onClick={() => addItem({ name: "111", id: Math.random().toString().slice(2, 10) })}>
					count is {doubleCount()},{doubleCount()}
				</button>
				<p>
					Edit <code>src/app.tsx</code> and save to test HMR
				</p>
			</div>
			<p class="read-the-docs">Click on the Vite and Solid logos to learn more</p>
		</>
	);
};
