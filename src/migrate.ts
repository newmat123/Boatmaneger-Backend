import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres"; //drizzle
import { Client } from "pg";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "./postgresql/boatEnv";
// import { migrateDb } from "./postgresql";

// await migrateDb();

// using xata.io

//yarn tsx src/migrate.ts
async function migrateDb(): Promise<void> {
  const URL = process.env.PGSQL_URI;
  const client = new Client({
    connectionString: URL,
  });

  await client.connect();
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: "./drizzle" }); // uncomment to migrate db
  client.end();
}

migrateDb();
