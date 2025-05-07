"use server";

import type {
	ActionState,
	CreateConversation,
	CreateMessage,
	CreateProduct,
	UpdateConversation,
} from "@/types";
import { eq } from "drizzle-orm";
import { db } from "../lib/db/db";
import * as schema from "../lib/db/schema";

export const createProduct = async (
	prev: ActionState<CreateProduct>,
	formData: FormData,
): Promise<ActionState<CreateProduct>> => {
	try {
		const product = {
			name: formData.get("name"),
			description: formData.get("description"),
			websiteUrl: formData.get("websiteUrl"),
			additionalInfo: formData.get("additionalInfo"),
			competitors: formData
				.getAll("competitors")
				.filter((competitor) => competitor !== ""),
		} as unknown as CreateProduct;

		const result = await db.insert(schema.products).values(product).returning();

		return {
			status: "success",
			data: result[0],
			error: null,
		};
	} catch (error) {
		return {
			status: "error",
			data: null,
			error: error instanceof Error ? error.message : "Something went wrong",
		};
	}
};

export const createConversation = async (conversation: CreateConversation) => {
	const { productId, title } = conversation;
	const result = await db
		.insert(schema.conversations)
		.values({
			productId,
			title,
		})
		.returning();

	return result[0];
};

export const updateConversation = async (
	id: number,
	data: UpdateConversation,
) => {
	const result = await db
		.update(schema.conversations)
		.set(data)
		.where(eq(schema.conversations.id, id))
		.returning();

	return result[0];
};

export const createMessage = async (message: CreateMessage) => {
	const { conversationId, role, content } = message;

	// Insert message
	const result = await db
		.insert(schema.messages)
		.values({
			conversationId,
			role,
			content,
		})
		.returning({ id: schema.messages.id });

	await db
		.update(schema.conversations)
		.set({ updatedAt: new Date() })
		.where(eq(schema.conversations.id, conversationId));

	return result[0]?.id;
};

export const toogleActiceConversation = async (
	conversationId: number,
	isActive: boolean,
) => {
	const result = await db
		.update(schema.conversations)
		.set({ isActive })
		.where(eq(schema.conversations.id, conversationId))
		.returning();

	return result[0];
};

export const deleteConversation = async (conversationId: number) => {
	const result = await db
		.delete(schema.conversations)
		.where(eq(schema.conversations.id, conversationId))
		.returning();

	return result[0];
};

export const renameConversation = async (
	conversationId: number,
	title: string,
) => {
	const result = await db
		.update(schema.conversations)
		.set({ title })
		.where(eq(schema.conversations.id, conversationId))
		.returning();

	return result[0];
};
