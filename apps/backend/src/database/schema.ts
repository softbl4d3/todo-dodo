import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	descriptoin: text("description"),
	isDeleted: integer("isDeleted", { mode: "boolean" }).default(false),
	completed: integer("completed", { mode: "boolean" }).default(false).notNull(),
});

export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull().unique(),
});
