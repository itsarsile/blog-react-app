import { Badge } from "@/components/ui/badge";
import { atom, useAtom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

const articleIdAtom = atom(null);
const [articleAtom] = atomsWithQuery((get) => ({
	queryKey: ["articles", get(articleIdAtom)],
	queryFn: async ({ queryKey: [, id] }) => {
		const res = await fetch(`http://localhost:8080/articles/${id}`, {
			method: "GET"
		});
		return res.json();
	},
}));

export default function Post() {
	const { articleId } = useParams();
	const [, setArticleId] = useAtom(articleIdAtom);
	setArticleId(+articleId);
	const [data] = useAtom(articleAtom);
	const navigate = useNavigate()
	if (!articleId) {
		navigate("/")
	}

	const article = data && data.articles
	return (
		<>
			<Helmet>
				<title>{article.title} - hello-world</title>
			</Helmet>
			<div className="max-w-2xl mx-auto">
				<div>
				<h1 className="text-2xl font-bold">{article.title}</h1>
				<span className="text-sm text-slate-400">{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
				</div>
				<div className="flex gap-1 pt-2">
				{splitTagsIntoBadges(article.tags)}
				</div>
				<article className="pt-5 text-justify whitespace-pre-line">
					{article.content}
				</article>
			</div>
		</>
	);
}

function splitTagsIntoBadges(string: string) {
	const badges = string.split(',').map((badge) => (
			<Badge variant="outline">{badge}</Badge>
	))
	return badges
}
