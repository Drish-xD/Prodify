import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
	path: ".env.local",
});

export default defineConfig({
	out: "./src/lib/db",
	schema: "./src/lib/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL ?? "NULL",
	},
	verbose: false,
	casing: "snake_case",
});
