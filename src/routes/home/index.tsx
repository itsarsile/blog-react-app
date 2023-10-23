import { Suspense } from "react";
import PostList from "./PostList";

export default function Home() {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<PostList />
			</Suspense>
		</div>
	);
}
