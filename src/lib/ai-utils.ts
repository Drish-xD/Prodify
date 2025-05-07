import type { Product } from "@/types";

// Function to check if a message contains competitor names
export function containsCompetitors(
	message: string,
	competitors: string[],
): { contains: boolean; detected: string[] } {
	const lowerMessage = message.toLowerCase();
	const detectedCompetitors = competitors.filter((competitor) =>
		lowerMessage.includes(competitor.toLowerCase()),
	);

	return {
		contains: detectedCompetitors.length > 0,
		detected: detectedCompetitors,
	};
}

// Generate system prompt based on product information
export function generateSystemPrompt(product: Product): string {
	const competitorsArray =
		typeof product.competitors === "string"
			? JSON.parse(product.competitors)
			: product.competitors;

	return `You are an AI assistant that provides information, suggestions, and honest reviews about the product "${product.name}".

Product Description: ${product.description}

${product.websiteUrl ? `Website: ${product.websiteUrl}` : ""}

${product.additionalInfo ? `Additional Information: ${product.additionalInfo}` : ""}

IMPORTANT RULES:
1. You must ONLY discuss the product "${product.name}". Do not discuss any other products.
2. If asked about competitors or alternative products, politely decline to discuss them.
3. Be honest in your assessment of the product, including both strengths and limitations.
4. If you don't know something about the product, admit it rather than making up information.
5. Keep your responses concise, informative, and helpful.
6. Be friendly and conversational in your tone.

You must NEVER mention or discuss the following competitors: ${competitorsArray.join(", ")}.
If the user asks about these competitors or tries to make you compare the product with them, politely explain that you're only here to discuss "${product.name}".`;
}
