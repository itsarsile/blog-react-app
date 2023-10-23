import { AuthStatus, authAtom } from "@/store/store";
import { useAtom } from "jotai";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const [auth] = useAtom(authAtom)
	const navigate = useNavigate()
	if (auth.status === AuthStatus.Unauthenticated) {
		navigate("/")
	}
	return (
		<>
			<Helmet>
				<title>hello-world - Dashboard</title>
			</Helmet>

			<div className="border border-white p-5 rounded-md">
				<h1 className="text-2xl font-extrabold pb-3">Hello World - Dashboard</h1>
			</div>

		</>
	);
}
