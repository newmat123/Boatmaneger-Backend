import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres"; //drizzle
import { Client } from "pg";

let db: NodePgDatabase<Record<string, never>>;

export default async function drizzleORMConnect(): Promise<void> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();
  db = drizzle(client);
}

export function useDrizzleORM(): NodePgDatabase<Record<string, never>> {
  if (!db) {
    throw new Error("DrizzleORM has not been initialized!");
  }
  return db;
}
