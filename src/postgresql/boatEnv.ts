import {
  numeric,
  pgTable,
  serial,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const environment = pgTable("environment", {
  id: serial("id").primaryKey(),
  temperature: numeric("temperature"),
  heat: numeric("heat"),
  humidity: numeric("humidity"),
  waterInBilge: boolean("waterInBilge"),
  timestamp: timestamp("timestamp").defaultNow(),
});
