"use server";

import { db } from "@/lib/db/db";

// Product operations
export const getAllProducts = async () => {
	const res = await db.query.products.findMany({
		orderBy: (f, o) => [o.desc(f.createdAt)],
	});

	return res;
};

export const getProductById = async (productId: number) => {
	const result = await db.query.products.findFirst({
		where: (f, o) => o.eq(f.id, productId),
	});
	return result;
};

// Conversation operations
export const getConversationsByProductId = async (productId: number) => {
	return await db.query.conversations.findMany({
		where: (f, o) => o.and(o.eq(f.productId, productId)),
		orderBy: (f, o) => o.desc(f.updatedAt),
	});
};

export const getConversationById = async (id: number, productId: number) => {
	return await db.query.conversations.findFirst({
		where: (f, o) => o.and(o.eq(f.id, id), o.eq(f.productId, productId)),
		orderBy: (f, o) => o.desc(f.updatedAt),
	});
};

// Message operations
export const getMessagesByConversationId = async (conversationId: number) => {
	return await db.query.messages.findMany({
		where: (f, o) => o.eq(f.conversationId, conversationId),
		orderBy: (f, o) => o.asc(f.createdAt),
	});
};
