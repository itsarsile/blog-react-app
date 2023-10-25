import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";

export type Article = {
	id: number;
	title: string;
	content: string;
	created_at: string;
};

export const columns: ColumnDef<Article>[] = [
	{
		accessorKey: "id",
		header: "Article ID",
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "content",
		header: "Content",
		cell: ({ row }) => {
			const content = row.original.content as string
			return <div>{content.substring(0, 30)}...</div>
		}
	},
	{
		accessorKey: "tags",
		header: "Tags",
	},
	{
		accessorKey: "created_at",
		header: "Posted at",
		cell: ({ row }) => {
			const formattedDate = new Date(
				row.getValue("created_at"),
			).toLocaleDateString("id-ID");
			return <div>{formattedDate}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const data = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Edit</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<Link to="/dashboard/article/edit" state={{ article: data }}>
							<DropdownMenuItem>Edit Post</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
