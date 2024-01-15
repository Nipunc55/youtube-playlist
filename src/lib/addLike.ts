import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { likes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateToken } from "@/utils/token";
export default async function addLike(
  likeData: {
    videoId: number;
  },
  token: string | null
): Promise<any | null> {
  const conn = connect(config);
  const db = drizzle(conn);

  try {
    if (!token) return { message: "token needed" };
    const { user_id } = validateToken(token).data;
    if (!user_id) return { message: "no user id" };

    // If not, insert the like
    const result = await db
      .insert(likes)
      .values({
        userId: user_id,
        videoId: likeData.videoId,
      })
      .execute();

    return { message: "success full" };
  } catch (error) {
    return { message: "server error" };
    // console.error("Error adding like:", error);
    // throw error;
  }
}
