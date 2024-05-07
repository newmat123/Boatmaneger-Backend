import {
  numeric,
  pgTable,
  serial,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const environment = pgTable("environment", {
  id: serial("id").primaryKey(),
  temperature: numeric("temperature", { precision: 5, scale: 2 }),
  heat: numeric("heat", { precision: 5, scale: 2 }),
  humidity: numeric("humidity", { precision: 5, scale: 2 }),
  bilgeStatus: boolean("bilgeStatus"),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
});

export const controlPanel = pgTable("controlPanel", {
  id: serial("id").primaryKey(),
  light: boolean("light"),
  heater: boolean("heater"),
});
