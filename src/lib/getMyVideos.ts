/** @format */

import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { videos, category, likes, users } from "@/db/schema";
import { eq, count, exists, and, desc } from "drizzle-orm";
import { validateToken } from "@/utils/token";

export default async function getMyVideos(
  token: string | null,
  pageNumber: number,
  pageSize: number
): Promise<videos[] | any> {
  const conn = connect(config);
  const db = drizzle(conn);
  let results: videos[] | any;
  try {
    let user_id = null;

    if (token !== "null") {
      user_id = validateToken(token || "")?.data?.user_id;
    }

    if (user_id !== null) {
      results = await db
        .select({
          url: videos.url,
          likes: count(likes.likeId),
          category_id: videos.categoryId,
          id: videos.id,
          author: videos.author_id,
          hasLiked: exists(
            db
              .select()
              .from(likes)
              .where(
                and(eq(likes.videoId, videos.id), eq(likes.userId, user_id))
              )
          ),
        })
        .from(videos)
        .leftJoin(likes, eq(likes.videoId, videos.id))
        .where(eq(videos.author_id, user_id))
        .groupBy(videos.url, videos.categoryId, videos.id, videos.author_id)
        .orderBy(desc(count(likes.likeId)))
        .offset(pageNumber * pageSize)
        .limit(pageSize);
      return results;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
