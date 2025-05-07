import { generateSystemPrompt } from "@/lib/ai-utils";
import { createMessage } from "@/services/actions";
import { getProductById } from "@/services/index";
import { type GoogleGenerativeAIProviderOptions, google } from "@ai-sdk/google";
import { streamText } from "ai";
import type { NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
	try {
		const { messages, conversationId, productId } = await req.json();

		// Get the product information
		const product = await getProductById(productId);

		if (!product) {
			return new Response(JSON.stringify({ error: "Product not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		const lastUserMessage = messages.findLast(
			(m: { role: string; content: string }) => m.role === "user",
		);

		if (lastUserMessage) {
			await createMessage({
				conversationId,
				role: "user",
				content: lastUserMessage.content,
			});
		}

		// Generate system prompt
		const systemPrompt = generateSystemPrompt(product);

		// Stream the AI response
		const result = streamText({
			model: google("gemini-2.0-flash"),
			messages: [{ role: "system", content: systemPrompt }, ...messages],
			providerOptions: {
				google: {
					responseModalities: ["TEXT"],
				} satisfies GoogleGenerativeAIProviderOptions,
			},
			onFinish: async ({ text }) => {
				await createMessage({
					conversationId,
					role: "assistant",
					content: text,
				});
			},
		});

		return result.toDataStreamResponse();
	} catch (error) {
		console.error("Chat API error:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
