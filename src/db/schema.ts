import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  unique,
  int,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// export const category = mysqlTable("category", {
// 	id: int("id").autoincrement().notNull(),
// 	category: varchar("category", { length: 255 }).notNull(),
// 	description: varchar("description", { length: 255 }),
// },
// (table) => {
// 	return {
// 		categoryIdPk: primaryKey({ columns: [table.id], name: "category_id_pk"}),
// 		category: unique("category").on(table.category),
// 	}
// });

// export const videos = mysqlTable("videos", {
// 	id: int("id").autoincrement().notNull(),
// 	url: varchar("url", { length: 255 }).notNull(),
// 	categoryId: int("category_id"),
// 	likes: int("likes"),
// 	description: varchar("description", { length: 255 }),
// },
// (table) => {
// 	return {
// 		categoryIdIdx: index("category_id_idx").on(table.categoryId),
// 		videosIdPk: primaryKey({ columns: [table.id], name: "videos_id_pk"}),
// 		url: unique("url").on(table.url),
// 	}
// });
export const category = mysqlTable(
  "category",
  {
    id: int("id").autoincrement().notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }),
  },
  (table) => {
    return {
      categoryIdPk: primaryKey({ columns: [table.id], name: "category_id_pk" }),
      category: unique("category").on(table.category),
    };
  }
);

export const likes = mysqlTable(
  "likes",
  {
    likeId: int("like_id").autoincrement().notNull(),
    userId: int("user_id").notNull(),
    videoId: int("video_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => {
    return {
      likesLikeIdPk: primaryKey({
        columns: [table.likeId],
        name: "likes_like_id_pk",
      }),
    };
  }
);

export const users = mysqlTable(
  "users",
  {
    userId: int("user_id").autoincrement().notNull(),
    username: varchar("username", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => {
    return {
      usersUserIdPk: primaryKey({
        columns: [table.userId],
        name: "users_user_id_pk",
      }),
      email: unique("email").on(table.email), ///added  later
    };
  }
);

export const videos = mysqlTable(
  "videos",
  {
    id: int("id").autoincrement().notNull(),
    url: varchar("url", { length: 255 }).notNull(),
    categoryId: int("category_id"),
    likes: int("likes"),
    description: varchar("description", { length: 255 }),
    author_id: varchar("author_id", { length: 15 }),
  },
  (table) => {
    return {
      categoryIdIdx: index("category_id_idx").on(table.categoryId),
      videosIdPk: primaryKey({ columns: [table.id], name: "videos_id_pk" }),
      url: unique("url").on(table.url),
    };
  }
);
