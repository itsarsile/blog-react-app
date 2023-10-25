import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import "./globals.css";
import Login from "./routes/auth/login/index.tsx";
import Dashboard from "./routes/dashboard";
import Home from "./routes/home";
import PostLayout from "./routes/post/PostLayout.tsx";
import Post from "./routes/post/index.tsx";
import Root from "./routes/root.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditPost from "./routes/dashboard/articles/edit.tsx";
import CreateArticles from "./routes/dashboard/articles/create.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Root />} errorElement={<ErrorPage />}>
				<Route index element={<Navigate to="/home" replace />} />
				<Route path="home" element={<Home />} />
				<Route element={<PostLayout />}>
					<Route path="article/:articleId" element={<Post />} />
				</Route>
				<Route
					path="dashboard"
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<Dashboard />
						</Suspense>
					}
				/>
				<Route path="dashboard/article/edit" element={<EditPost />} />
				<Route path="dashboard/article/create" element={<CreateArticles />} />
				<Route element={<Login />} path="/auth/login" />
			</Route>
		</>,
	),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CookiesProvider defaultSetOptions={{ path: "/" }}>
				<Provider>
					<RouterProvider router={router} />
				</Provider>
				<ReactQueryDevtools initialIsOpen={true} />
			</CookiesProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
