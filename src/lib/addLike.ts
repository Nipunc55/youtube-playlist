import Like from "@/models/Like";
import { validateToken } from "@/utils/token";
import dbConnect from "./mongodb";
export default async function addLike(
  likeData: {
    videoId: String;
  },
  token: string | null
): Promise<any | null> {
  await dbConnect();

  try {
    if (!token) return { status: false, message: "token needed" };
    const { user_id } = validateToken(token)?.data;
    if (!user_id) return { status: false, message: "no user id" };

    const existingLike = await Like.findOne({
      userId: user_id,
      videoId: likeData.videoId,
    });
    if (existingLike) return { status: false, message: "Like already exists" };
    // If not, insert the like
    const newLike = new Like({
      userId: user_id,
      videoId: likeData.videoId,
    });
    const result = await newLike.save();
    console.log(result);

    return { status: true, message: "success full" };
  } catch (error) {
    console.log(error);

    return { status: false, message: `${error}` };
    // console.error("Error adding like:", error);
    // throw error;
  }
}
