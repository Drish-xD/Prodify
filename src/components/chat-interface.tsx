"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Conversation, Product } from "@/types";
import { type Message, useChat } from "@ai-sdk/react";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatInterfaceProps {
	product: Product;
	conversation: Conversation;
	initialMessages: Message[];
}

export default function ChatInterface({
	product,
	conversation,
	initialMessages,
}: ChatInterfaceProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { messages, input, handleInputChange, handleSubmit, status } = useChat({
		api: "/api/chat",
		initialMessages,
		body: {
			conversationId: conversation.id,
			productId: product.id,
		},
		onError: (error) => {
			console.error("Error in chat:", error);
		},
	});

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	const displayMessages = messages.map((message) => {
		if (
			message.role === "assistant" &&
			message.content.startsWith("{") &&
			message.content.includes('"terminated":')
		) {
			try {
				const data = JSON.parse(message.content);
				if (data.terminated) {
					return {
						...message,
						content: `I apologize, but I'm only able to discuss ${
							product.name
						}. I can't provide information about or compare with ${data.detected.join(
							", ",
						)}. If you'd like to continue our conversation about ${
							product.name
						}, please feel free to ask another question in a new chat.`,
					};
				}
			} catch {
				// Not JSON or not a termination message, return as is
			}
		}
		return message;
	});

	return (
		<div className="flex-1 flex flex-col h-full">
			<div className="border-b p-4">
				<h1 className="text-xl font-semibold">{product.name}</h1>
				<p className="text-sm text-muted-foreground">
					Ask questions about this product
				</p>
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-6">
				{displayMessages.length === 0 ? (
					<div className="text-center py-10">
						<p className="text-muted-foreground">
							Start the conversation by asking a question about {product.name}
						</p>
					</div>
				) : (
					displayMessages.map((message) => (
						<div
							key={message.id}
							className={`flex ${
								message.role === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`max-w-[80%] rounded-lg p-4 ${
									message.role === "user"
										? "bg-primary text-primary-foreground"
										: "bg-muted"
								}`}
							>
								<div className="flex items-start gap-3">
									{message.role === "assistant" && (
										<Avatar className="h-8 w-8">
											<div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center">
												AI
											</div>
										</Avatar>
									)}
									<div className="space-y-2">
										<div className="whitespace-pre-wrap">{message.content}</div>
									</div>
								</div>
							</div>
						</div>
					))
				)}
				{status === "submitted" && (
					<div className="flex-1 flex items-center justify-center">
						<div className="animate-pulse">Thinking...</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className="border-t p-4">
				<form onSubmit={handleSubmit} className="flex gap-2">
					<Input
						value={input}
						onChange={handleInputChange}
						placeholder={
							conversation.isActive
								? `Ask about ${product.name}...`
								: "This conversation has been terminated. You can resume it."
						}
						disabled={status === "streaming" || !conversation.isActive}
						className="flex-1"
						autoFocus
					/>
					<Button
						type="submit"
						disabled={
							status === "streaming" || !input.trim() || !conversation.isActive
						}
					>
						<Send className="h-4 w-4" />
						<span className="sr-only">Send</span>
					</Button>
				</form>
			</div>
		</div>
	);
}
