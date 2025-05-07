"use client";

import { createConversation } from "@/services/actions";
import type { Product } from "@/types";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";

const NewConversationBtn = ({ product }: { product: Product }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleNewConversation = async () => {
		startTransition(async () => {
			const newConversation = await createConversation({
				productId: product.id,
				title: `Chat about ${product.name} ${new Date().toLocaleDateString()}`,
			});

			router.push(`/chat/${product.id}?conversationId=${newConversation.id}`);
		});
	};

	return (
		<Button
			variant="outline"
			className="w-full justify-start"
			onClick={handleNewConversation}
			disabled={isPending}
		>
			{isPending ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<PlusIcon className="mr-2 h-4 w-4" />
			)}
			New Chat
		</Button>
	);
};

export default NewConversationBtn;
