import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
// import { migrate } from "drizzle-orm/postgres-js/migrator";

let db: NodePgDatabase<Record<string, never>>;

export default async function drizzleORMConnect(): Promise<void> {
  // const client = new Client({
  //   host: "127.0.0.1",
  //   port: 5432,
  //   user: "postgres",
  //   password: "password",
  //   database: "db_name",
  // });
  const URL = process.env.PGSQL_URI;
  const client = new Client({
    connectionString: URL,
  });

  await client.connect();
  db = drizzle(client);
  // await migrate(db, { migrationsFolder: "drizzle" });
}

// // Executes TypeORM query for the provided entity model
export function useDrizzleORM(): NodePgDatabase<Record<string, never>> {
  if (!db) {
    throw new Error("DrizzleORM has not been initialized!");
  }
  return db;
}
