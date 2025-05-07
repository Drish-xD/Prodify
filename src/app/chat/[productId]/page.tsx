import ChatInterface from "@/components/chat-interface";
import ChatSidebar from "@/components/sidebar";
import {
	getConversationById,
	getConversationsByProductId,
	getMessagesByConversationId,
	getProductById,
} from "@/services";
import { createConversation } from "@/services/actions";
import type { Conversation } from "@/types";
import type { Message } from "@ai-sdk/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ChatPageProps {
	params: Promise<{
		productId: string;
	}>;
	searchParams: Promise<{
		conversationId?: string;
	}>;
}

export default async function ChatPage({
	params,
	searchParams,
}: ChatPageProps) {
	const { productId } = await params;
	const { conversationId } = await searchParams;

	console.log("conversationId : : : : ", conversationId);

	const [product, conversations] = await Promise.all([
		getProductById(Number(productId)),
		getConversationsByProductId(Number(productId)),
	]);

	if (!product) {
		notFound();
	}

	let activeConversation: Conversation | undefined = undefined;

	if (conversationId) {
		const requestedConversation = await getConversationById(
			Number(conversationId),
			Number(productId),
		);
		if (requestedConversation) {
			activeConversation = requestedConversation;
		}
	}

	if (!activeConversation) {
		const anyActiveConversation = conversations.find((c) => c.isActive);
		if (anyActiveConversation) {
			activeConversation = anyActiveConversation;
		} else {
			activeConversation = await createConversation({
				productId: Number(productId),
				title: "New Conversation",
			});
		}
	}

	if (!activeConversation) {
		notFound();
	}

	const messages = await getMessagesByConversationId(activeConversation.id);

	const initialMessages: Message[] = messages.map((message) => ({
		id: message.id.toString(),
		role: message.role,
		content: message.content,
		createdAt: message.createdAt,
	}));

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<ChatSidebar
				product={product}
				conversations={conversations}
				activeConversationId={activeConversation.id}
			/>

			{/* ChatBox */}
			<ChatInterface
				product={product}
				conversation={activeConversation}
				initialMessages={initialMessages}
			/>
		</div>
	);
}

export async function generateMetadata({
	params,
}: ChatPageProps): Promise<Metadata> {
	const { productId } = await params;
	const product = await getProductById(Number(productId));

	if (!product) {
		return {
			title: "Product Not Found",
		};
	}

	return {
		title: `Chat About ${product.name}`,
		description: `Chat with AI about ${product.name}`,
	};
}
