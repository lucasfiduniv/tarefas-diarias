import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";
import { drizzle } from "drizzle-orm/postgres-js";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const client = postgres(env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(client, {
  schema,
  logger: true,
});
