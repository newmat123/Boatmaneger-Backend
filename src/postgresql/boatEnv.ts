import { numeric, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const temperature = pgTable("temperature", {
  id: serial("id").primaryKey(),
  value: numeric("value"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const heat = pgTable("heat", {
  id: serial("id").primaryKey(),
  value: numeric("value"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const humidity = pgTable("humidity", {
  id: serial("id").primaryKey(),
  value: numeric("value"),
  timestamp: timestamp("timestamp").defaultNow(),
});
