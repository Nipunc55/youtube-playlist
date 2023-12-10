import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, int, varchar, index } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const category = mysqlTable("category", {
	id: int("id").autoincrement().notNull(),
	category: varchar("category", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }),
},
(table) => {
	return {
		categoryIdPk: primaryKey({ columns: [table.id], name: "category_id_pk"}),
		category: unique("category").on(table.category),
	}
});

export const videos = mysqlTable("videos", {
	id: int("id").autoincrement().notNull(),
	url: varchar("url", { length: 255 }).notNull(),
	categoryId: int("category_id"),
	likes: int("likes"),
	description: varchar("description", { length: 255 }),
},
(table) => {
	return {
		categoryIdIdx: index("category_id_idx").on(table.categoryId),
		videosIdPk: primaryKey({ columns: [table.id], name: "videos_id_pk"}),
		url: unique("url").on(table.url),
	}
});