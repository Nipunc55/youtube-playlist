/** @format */

import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { videos, category, likes, users } from "@/db/schema";
import { eq, count, exists, and, desc, countDistinct, sum } from "drizzle-orm";
import { validateToken } from "@/utils/token";

export default async function getMyStats(
  token: string | null
): Promise<videos[] | any> {
  const conn = connect(config);
  const db = drizzle(conn);
  let results: any;
  try {
    let user_id = null;

    if (token !== "null") {
      user_id = validateToken(token || "")?.data?.user_id;
    }

    if (user_id !== null) {
      results = await db
        .select({
          user_id: videos.author_id,
          totalVideos: countDistinct(videos.id),
          totalLikes: count(likes.likeId),
        })
        .from(videos)
        .leftJoin(likes, eq(likes.videoId, videos.id))
        .where(eq(videos.author_id, user_id))
        .groupBy(videos.author_id);
      return results;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
