import { atom, useAtom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const articleIdAtom = atom(null);
const [articleAtom] = atomsWithQuery((get) => ({
	queryKey: ["articles", get(articleIdAtom)],
	queryFn: async ({ queryKey: [, id] }) => {
		const res = await fetch(`http://localhost:8080/articles/${id}`);
		return res.json();
	},
}));

export default function Post() {
	const { articleId } = useParams();
	const [, setArticleId] = useAtom(articleIdAtom);
	const [article] = useAtom(articleAtom);
	setArticleId(+articleId);
	console.log(article);
	return (
		<>
			<Helmet>
				<title>Post {articleId} - hello-world</title>
			</Helmet>
			<div>Post {articleId}</div>
		</>
	);
}
