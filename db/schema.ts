import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull().default(""),
  body: text("body").notNull().default(""),
  date: text("date").notNull().default(""),
  favorite: integer("favorite", { mode: "boolean" }).notNull().default(false),
});
