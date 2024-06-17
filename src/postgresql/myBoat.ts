import {
  numeric,
  pgTable,
  serial,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

export const environment = pgTable("environment", {
  id: serial("id").primaryKey(),
  temperature: numeric("temperature", { precision: 5, scale: 2 }),
  heat: numeric("heat", { precision: 5, scale: 2 }),
  humidity: numeric("humidity", { precision: 5, scale: 2 }),
  bilgeStatus: boolean("bilgeStatus"),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
});

export const controlPanelSwitches = pgTable("controlPanelSwitches", {
  id: serial("id").primaryKey(),
  switchId: serial("switchId"),
  name: varchar('name'),
  state: boolean("state"),
  synced: boolean("synced").default(true),
});
