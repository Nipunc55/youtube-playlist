/** @format */
import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { category } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function addCategory(
  categoryName: string
): Promise<any | null> {
  const conn = connect(config);
  const db = drizzle(conn);

  try {
    const data = { category: categoryName };
    // Assuming that the videos table has an auto-incrementing 'id' field
    const result = await db.insert(category).values(data).execute();

    return result || null;
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
}
