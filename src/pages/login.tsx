import m from "mithril";
import Password from "@/coms/password";
import PerfersColor from "@/coms/perferscolor";
import MD5 from "crypto-js/md5";

const loginData = {
	account: "",
	password: "",
};

// e.preventDefault()
export default {
	view: () => (
		<>
			<PerfersColor class="w-10 absolute right-2 top-2 text-xl" />
			<div class="flex mx-auto w-80 h-56 mt-[32vh] border rounded-md shadow-md flex-col justify-evenly items-center">
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
				<button
					class="w-60"
					onclick={() => {
						console.log(MD5(loginData.password).toString());
						m.route.set("/coutDown");
					}}
				>
					LOGIN
				</button>
			</div>
		</>
	),
};
