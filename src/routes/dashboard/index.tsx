import { AuthStatus, authAtom } from "@/store/store";
import { useAtom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { columns } from "./articles/columns";
import { DataTable } from "./articles/data-table";

const [articlesByUserIdAtom] = atomsWithQuery(() => {
	const sessionStr = localStorage.getItem("authStatus");
	const session = sessionStr ? JSON.parse(sessionStr) : null;
	return {
		queryKey: ["articles", session.user.id],
		queryFn: async ({ queryKey: [, id] }) => {
			const res = await fetch(`http://localhost:8080/articles/user/${id}`);
			return res.json();
		},
	};
});

export default function Dashboard() {
	const [auth] = useAtom(authAtom);
	const [data] = useAtom(articlesByUserIdAtom);
	const navigate = useNavigate();
	if (auth.status === AuthStatus.Unauthenticated) {
		navigate("/");
	}

	return (
		<>
			<Helmet>
				<title>hello-world - Dashboard</title>
			</Helmet>

			<div className="border border-white/20 p-5 rounded-md">
				<h1 className="text-2xl font-extrabold pb-3">
					Hello World - Dashboard
				</h1>
				<DataTable columns={columns} data={data.articles} />
			</div>
		</>
	);
}
