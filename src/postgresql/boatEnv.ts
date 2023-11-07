import { numeric, pgSchema, serial, timestamp } from "drizzle-orm/pg-core";

export const $boatEnv = pgSchema("boatEnv");

export const temperature = $boatEnv.table("temperature", {
  id: serial("id").primaryKey(),
  value: numeric("value"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const heat = $boatEnv.table("heat", {
  id: serial("id").primaryKey(),
  value: numeric("value"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const humidity = $boatEnv.table("humidity", {
  id: serial("id").primaryKey(),
  value: numeric("value"),
  timestamp: timestamp("timestamp").defaultNow(),
});
