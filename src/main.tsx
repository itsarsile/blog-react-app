import React from "react";
import ReactDOM from "react-dom/client";
import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "./globals.css";
import Root from "./routes/root.tsx";
import ErrorPage from "./error-page.tsx";
import Dashboard from "./routes/dashboard";
import Home from "./routes/home";
import Post from "./routes/post/index.tsx";
import PostLayout from "./routes/post/PostLayout.tsx";
import { Provider } from "jotai/react";
import Login from "./routes/auth/login/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from 'react-cookie'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { queryClientAtom } from "jotai-tanstack-query";
import { useHydrateAtoms } from "jotai/utils";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

const HydrateAtoms = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Root />} errorElement={<ErrorPage />}>
				<Route index element={<Navigate to="/home" replace />} />
				<Route path="home" element={<Home />} />
				<Route element={<PostLayout />}>
					<Route path="article/:articleId" element={<Post />} />
				</Route>
				<Route path="dashboard" element={<Dashboard />} />
				<Route element={<Login />} path="/auth/login" />
			</Route>
		</>,
	),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
		<CookiesProvider defaultSetOptions={{ path: '/'}}>
		<Provider>
			<HydrateAtoms>
				<RouterProvider router={router} />
			</HydrateAtoms>
		</Provider>
			<ReactQueryDevtools initialIsOpen={true}/>
		</CookiesProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
