import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres"; //drizzle
import { Client } from "pg";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from './myBoat';

async function migrateDb(): Promise<void> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client, { schema });
  // const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./drizzle" });
  client.end();
}

migrateDb();