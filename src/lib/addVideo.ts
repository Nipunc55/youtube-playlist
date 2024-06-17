import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Video from "@/models/Video";
import { validateToken } from "@/utils/token";

interface IVideoData {
  url: string;
  categoryId?: string;
  description?: string;
}

async function addVideo(
  videoData: IVideoData,
  token: string
): Promise<any | null> {
  await dbConnect();

  // Replace this with your actual token validation logic
  const isValidToken = validateToken(token);
  if (!isValidToken) {
    throw new Error("Invalid authentication token");
  }

  try {
    const { categoryId, ...rest } = videoData;

    // Validate and cast categoryId if provided
    let categoryObjectId;
    if (categoryId) {
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        categoryObjectId = new mongoose.Types.ObjectId(categoryId);
      } else {
        throw new Error("Invalid categoryId format");
      }
    }

    const videoDoc = new Video({
      ...rest,
      categoryId: categoryObjectId,
    });

    const result = await videoDoc.save();
    return result || null;
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
}

export default addVideo;
