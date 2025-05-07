import type * as schema from "@/lib/db/schema";

export type Product = typeof schema.products.$inferSelect;

export type Conversation = typeof schema.conversations.$inferSelect;

export type Message = typeof schema.messages.$inferSelect;

export type CreateProduct = typeof schema.products.$inferInsert;

export type CreateConversation = typeof schema.conversations.$inferInsert;

export type CreateMessage = typeof schema.messages.$inferInsert;

export type UpdateConversation = Partial<
	typeof schema.conversations.$inferInsert
>;

export type UpdateMessage = Partial<typeof schema.messages.$inferInsert>;

export type ActionState<T> = {
	status: "pending" | "success" | "error" | "default";
	error: string | null;
	data: T | null;
};
