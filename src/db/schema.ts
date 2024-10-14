import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const filesTable = mysqlTable("files", {
  id: int().autoincrement().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  size: int().notNull(),
  type: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 500 }).notNull().unique(),
  uploadedAt: timestamp().notNull(),
});
