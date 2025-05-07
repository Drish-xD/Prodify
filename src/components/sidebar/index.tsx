import { Button } from "@/components/ui/button";
import type { Conversation, Product } from "@/types";
import { Home } from "lucide-react";
import Link from "next/link";
import NewConversationBtn from "./new-conversation";
import SidebarItem from "./sidebar-item";

interface ChatSidebarProps {
	product: Product;
	conversations: Conversation[];
	activeConversationId: number;
}

export default function ChatSidebar({
	product,
	conversations,
	activeConversationId,
}: ChatSidebarProps) {
	return (
		<div className="w-64 border-r bg-muted/40 flex flex-col h-full">
			<div className="p-4 border-b">
				<h2 className="font-semibold truncate">{product.name}</h2>
			</div>

			<div className="flex-1 overflow-y-auto p-2">
				<div className="space-y-1">
					{conversations.map((conversation) => (
						<SidebarItem
							key={conversation.id}
							conversation={conversation}
							product={product}
							activeConversationId={activeConversationId}
						/>
					))}
				</div>
			</div>

			<div className="p-2 border-t space-y-2">
				<NewConversationBtn product={product} />
				<Button variant="ghost" className="w-full justify-start" asChild>
					<Link href="/">
						<Home className="mr-2 h-4 w-4" />
						Back to Products
					</Link>
				</Button>
			</div>
		</div>
	);
}
