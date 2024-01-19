/** @format */
import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { videos, category } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateToken } from "@/utils/token";

export default async function addVideo(
  videoData: videos,
  token: string | null
): Promise<any | null> {
  const conn = connect(config);
  const db = drizzle(conn);

  try {
    if (!token) return { status: false, message: "token needed" };
    const { user_id } = validateToken(token)?.data;
    if (!user_id) return { status: false, message: "no user id" };
    const video = {
      ...videoData,
      author_id: user_id,
    };
    const result = await db.insert(videos).values(video).execute();

    return result || null;
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
}
