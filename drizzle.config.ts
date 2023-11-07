import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/postgresql/boatEnv.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: String(process.env.PGSQL_URI),
  },
} satisfies Config;
