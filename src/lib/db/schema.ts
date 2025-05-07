import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["assistant", "user"]);

export const products = pgTable(
	"products",
	{
		id: serial().primaryKey(),
		name: varchar({ length: 255 }).notNull(),
		description: text().notNull(),
		websiteUrl: varchar({ length: 500 }),
		additionalInfo: text(),
		competitors: jsonb().notNull().$type<string[]>(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		index().on(table.name),
		index().on(table.createdAt),
		index().on(table.websiteUrl),
	],
);

export const conversations = pgTable(
	"conversations",
	{
		id: serial().primaryKey(),
		productId: integer()
			.notNull()
			.references(() => products.id, { onDelete: "cascade" }),
		title: varchar({ length: 255 }),
		isActive: boolean().default(true).notNull(),
		terminationReason: text(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		index().on(table.productId),
		index().on(table.updatedAt),
		index().on(table.isActive),
	],
);

export const messages = pgTable(
	"messages",
	{
		id: serial().primaryKey(),
		conversationId: integer()
			.notNull()
			.references(() => conversations.id, { onDelete: "cascade" }),
		role: roleEnum().notNull(),
		content: text().notNull(),
		createdAt: timestamp().defaultNow().notNull(),
	},
	(table) => [
		index().on(table.conversationId),
		index().on(table.createdAt),
		index().on(table.role),
	],
);

// Define relations for type safety
export const productsRelations = relations(products, ({ many }) => ({
	conversations: many(conversations),
}));

export const conversationsRelations = relations(
	conversations,
	({ one, many }) => ({
		product: one(products, {
			fields: [conversations.productId],
			references: [products.id],
		}),
		messages: many(messages),
	}),
);

export const messagesRelations = relations(messages, ({ one }) => ({
	conversation: one(conversations, {
		fields: [messages.conversationId],
		references: [conversations.id],
	}),
}));
