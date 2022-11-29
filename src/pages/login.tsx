import m from "mithril";
import Password from "@/coms/password";

const loginData = {
	account: "",
	password: "",
};

// e.preventDefault()
export default {
	view: () => (
		<div class="flex mx-auto w-[300px] h-56 mt-[32vh] border rounded-md shadow-md flex-col justify-evenly items-center">
			<div class="w-60 text-left font-bold">LOGIN SYS</div>
			<input
				type="text"
				value={loginData.account}
				oninput={(e) => (loginData.account = e.target?.value)}
				class="w-60"
				placeholder="account"
			/>
			<Password
				oninput={(e) => (loginData.password = e.target?.value)}
				value={loginData.password}
				class="w-60"
				placeholder="password"
			/>
			<button class="w-60" onclick={() => m.route.set("/coutDown")}>
				LOGIN
			</button>
		</div>
	),
};
