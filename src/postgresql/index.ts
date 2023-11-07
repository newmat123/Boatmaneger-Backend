import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

let db: NodePgDatabase<Record<string, never>>;

export default async function drizzleORMConnect(): Promise<void> {
  const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "db_name",
  });

  await client.connect();
  db = drizzle(client);
}

// // Executes TypeORM query for the provided entity model
export function useDrizzleORM(): NodePgDatabase<Record<string, never>> {
  if (!db) {
    throw new Error("TypeORM has not been initialized!");
  }
  return db;
}
