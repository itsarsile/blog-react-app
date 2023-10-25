import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { atomsWithMutation } from "jotai-tanstack-query";
import { atomFamily } from "jotai/utils";
import { useForm } from "react-hook-form";
import {
	useLocation,
	useNavigate,
} from "react-router-dom";
import * as z from "zod";

const articleSchema = z.object({
	title: z.string().min(5),
	content: z.string().min(20),
	tags: z.string().min(5),
});

const articleAtomFamily = atomFamily((id: number) => {
	const [, articleAtom] = atomsWithMutation(() => {
		return {
			mutationKey: ["article"],
			mutationFn: async ({
				title,
				content,
				tags,
			}: { title: string; content: string; tags: string }) => {
				const res = await fetch(`http://localhost:8080/articles/${id}`, {
					method: "PUT",
					body: JSON.stringify({ title, content, tags }),
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				const data = await res.json();
				return data;
			},
		};
	});

	return articleAtom;
});

const deleteArticleAtom = atomFamily((id: number) => {
	const [, deleteArticleAtom] = atomsWithMutation(() => {
		return {
			mutationKey: ["article"],
			mutationFn: async () => {
				const res = await fetch(`http://localhost:8080/articles/${id}`, {
					method: "DELETE",
					credentials: "include",
				});
				const data = await res.json();
				return data;
			},
		};
	});
	return deleteArticleAtom;
});

export default function EditPost() {
	const location = useLocation();
	const navigate = useNavigate();
	const { article } = location.state;
	const [, mutate] = useAtom(articleAtomFamily(article.id));
	const [, deleteMutate] = useAtom(deleteArticleAtom(article.id));
	const form = useForm<z.infer<typeof articleSchema>>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: article.title,
			tags: article.tags,
			content: article.content,
		},
	});

	async function onSubmit(values: z.infer<typeof articleSchema>) {
		try {
			const response = await mutate([
				{ title: values.title, content: values.content, tags: values.tags },
			]);
			if (!response) {
				toast({
					title: "Failed updating content",
				});
			}
			toast({
				title: "Success updating content",
			});
			navigate("/dashboard");
		} catch (error) {
			console.error(error);
		}
	}

	async function onDelete() {
		try {
			const response = await deleteMutate([]);
			if (!response) {
				toast({
					title: "Failed deleting content",
				});
			}
			toast({
				title: "Success deleting content",
			});
		} catch (error) {
			toast({
				title: "Error while deleting content"
			})
		}
	}

		return (
			<div className="container p-5 rounded-md border border-white/20">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-3">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Title..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tags"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tags</FormLabel>
										<FormControl>
											<Input type="text" {...field} placeholder="Tags..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Content</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Content..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-3">
								<Button type="submit">Update</Button>
								<Button
									onClick={onDelete}
									type="button"
									className="bg-red-500 text-white"
								>
									Delete
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
		);
	
}
