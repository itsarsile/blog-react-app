import LoginForm from "./LoginForm";
import { atom, useAtom } from "jotai";

const focusAtom = atom(false);
export default function Login() {
	const [focus, setFocus] = useAtom(focusAtom);
	return (
		<div className="mx-auto">
			<div
				className={`border-slate-100/20 rounded-md border max-w-md mx-auto p-5 ${
					focus &&
					"transition-all delay-100 duration-200 ease-in-out shadow-white/10 shadow-xl"
				}`}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			>
				<h1 className="font-extrabold text-2xl pb-5">Login</h1>
				<LoginForm />
			</div>
		</div>
	);
}
