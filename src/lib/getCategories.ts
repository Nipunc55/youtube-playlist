/** @format */

import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { videos, category } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getAllCategories(): Promise<category[]> {
  const conn = connect(config);
  const db = drizzle(conn);

  const results: category[] = await db
    .select({
      id: category.id,
      category: category.category,
    })
    .from(category);

  return results;
}
