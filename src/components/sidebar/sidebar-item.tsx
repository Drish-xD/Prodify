"use client";

import {
	deleteConversation,
	renameConversation,
	toogleActiceConversation,
} from "@/services/actions";
import type { Conversation, Product } from "@/types";
import {
	EllipsisVertical,
	MessageSquare,
	MessageSquareOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const SidebarItem = ({
	conversation,
	product,
	activeConversationId,
}: {
	conversation: Conversation;
	product: Product;
	activeConversationId: number;
}) => {
	const router = useRouter();
	const [isRenaming, setIsRenaming] = useState(false);
	const [newTitle, setNewTitle] = useState(
		conversation.title || "New conversation",
	);

	const handleRename = () => {
		setIsRenaming(true);
		setNewTitle(conversation.title || "New conversation");
	};

	const handleSave = async () => {
		await renameConversation(conversation.id, newTitle);
		setIsRenaming(false);
		router.refresh();
	};

	const handleCancel = () => {
		setIsRenaming(false);
		setNewTitle(conversation.title || "New conversation");
	};

	return (
		<Link
			href={`/chat/${product.id}?conversationId=${conversation.id}`}
			className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
				conversation.id === activeConversationId
					? "bg-accent text-accent-foreground"
					: "hover:bg-muted"
			} ${conversation.isActive ? "opacity-70" : "opacity-50"}`}
		>
			{conversation.isActive ? (
				<MessageSquare className="h-4 w-4" />
			) : (
				<MessageSquareOff className="h-4 w-4" />
			)}

			<span className="truncate">
				{isRenaming ? (
					<Input
						autoFocus
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						onBlur={handleSave}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSave();
							}
							if (e.key === "Escape") {
								handleCancel();
							}
						}}
					/>
				) : (
					conversation.title || `Chat ${conversation.id}`
				)}
			</span>

			<DropdownMenu>
				<DropdownMenuTrigger className="ml-auto hover:bg-secondary">
					<EllipsisVertical className="h-4 w-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={handleRename}>Rename</DropdownMenuItem>
					<DropdownMenuItem onClick={() => deleteConversation(conversation.id)}>
						Delete
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							toogleActiceConversation(conversation.id, !conversation.isActive)
						}
					>
						{conversation.isActive ? "Terminate" : "Resume"}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Link>
	);
};

export default SidebarItem;
