import { Link } from "react-router-dom";
import { atomsWithQuery } from "jotai-tanstack-query";
import { useAtom } from "jotai";

type ArticlesType = {
	id: number;
	title: string;
	content: string;
	created_at: string;
};

const [articlesAtom] = atomsWithQuery((_get) => ({
	queryKey: ["articles"],
	queryFn: async (): Promise<ArticlesType[]> => {
		const res = await fetch(`http://localhost:8080/articles`);
		return res.json();
	},
}));

export default function PostList() {
	const [articles] = useAtom(articlesAtom);
	console.log(articles);
	const posts = articles.map((article) => (
		<Link
			key={article.id}
			to={`/article/${article.id}`}
			className="border-[1px] p-5 rounded-md hover:shadow-white/10 hover:shadow-lg  hover:border-sky-900 transition-all hover:scale-105 hover:delay-75 ease-in-out"
		>
			<div>
				<h1 className="font-bold text-lg">{article.title}</h1>
				<p className="text-sm text-slate-400">
					{new Date(article.created_at).toLocaleDateString("id-ID")}
				</p>
				<p>{article.content.substring(0, 100)} <span className="text-sky-400">More...</span></p>
			</div>
		</Link>
	));
	return (
		<div>
			<h1 className="text-2xl font-medium">Blog Posts</h1>
			<div className="border-b-2 border-white py-1" />
			<div className="grid grid-cols-3 pt-3 gap-5">{posts}</div>
		</div>
	);
}
