import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL || "NOT_SET");
export const db = drizzle(sql, { schema, casing: "snake_case" });
