/** @format */

import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { videos, category, likes, users } from "@/db/schema"; // Import the likes table
import { eq, count, exists, and, desc } from "drizzle-orm";
import { validateToken } from "@/utils/token";

export default async function getAllVideos(
  categoryId: number,
  token: string | null
): Promise<videos[] | any> {
  const conn = connect(config);
  const db = drizzle(conn);
  let results: videos[];
  try {
    let user_id = null;

    if (token !== "null") {
      user_id = validateToken(token || "").data.user_id;
    }

    // results = await db
    //   .select({
    //     url: videos.url,
    //     likes: count(likes.likeId),
    //     category_id: videos.categoryId,
    //     category: category.category,
    //   })
    //   .from(videos)
    //   .where(eq(videos.categoryId, categoryId))
    //   .innerJoin(category, eq(videos.categoryId, category.id))
    //   .leftJoin(likes, eq(likes.videoId, videos.id))
    //   .groupBy(videos.url, videos.categoryId, category.category);
    if (user_id !== null) {
      results = await db
        .select({
          url: videos.url,
          likes: count(likes.likeId),
          category_id: videos.categoryId,
          category: category.category,
          id: videos.id,
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
        .where(eq(videos.categoryId, categoryId))
        .innerJoin(category, eq(videos.categoryId, category.id))
        .leftJoin(likes, eq(likes.videoId, videos.id))
        .groupBy(videos.url, videos.categoryId, category.category)
        .orderBy(desc(count(likes.likeId)));
    } else {
      results = await db
        .select({
          url: videos.url,
          likes: count(likes.likeId),
          category_id: videos.categoryId,
          category: category.category,
          id: videos.id,
        })
        .from(videos)
        .where(eq(videos.categoryId, categoryId))
        .innerJoin(category, eq(videos.categoryId, category.id))
        .leftJoin(likes, eq(likes.videoId, videos.id))
        .groupBy(videos.url, videos.categoryId, category.category)
        .orderBy(desc(count(likes.likeId)));
    }

    // results = await db
    //   .select({
    //     url: videos.url,
    //     likes: count(likes.likeId),
    //     category_id: videos.categoryId,
    //     category: category.category,
    //     id: videos.id,
    //     hasLiked: user_id ?(
    //       exists(
    //         db
    //           .select()
    //           .from(likes)
    //           .where(
    //             and(eq(likes.videoId, videos.id), eq(likes.userId, user_id))
    //           )
    //       ),
    //       2 // Default value when user_id is null
    //     ),
    //   })
    //   .from(videos)
    //   .where(eq(videos.categoryId, categoryId))
    //   .innerJoin(category, eq(videos.categoryId, category.id))
    //   .leftJoin(likes, eq(likes.videoId, videos.id))
    //   .groupBy(videos.url, videos.categoryId, category.category)
    //   .orderBy(desc(count(likes.likeId)));

    return results;
  } catch (error) {
    console.log(error);
    return null;
  }

  // const results: videos[] = await db
  // 	.select({
  // 		url: videos.url,
  // 		likes: videos.likes,
  // 		category_id:videos.categoryId,

  // 		category: category.category,
  // 	})
  // 	.from(videos)
  // 	.where(eq(videos.categoryId, categoryId))
  // 	.innerJoin(category, eq(videos.categoryId, category.id));
}
