import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Video from "@/models/Video";
import { validateToken } from "@/utils/token";

interface IVideoData {
  url: string;
  courseId?: string;
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
    const { courseId, ...rest } = videoData;

    // Validate and cast course if provided
    let courseObjectId;
    if (courseId) {
      if (mongoose.Types.ObjectId.isValid(courseId)) {
        courseObjectId = new mongoose.Types.ObjectId(courseId);
      } else {
        throw new Error("Invalid course format");
      }
    }

    const videoDoc = new Video({
      ...rest,
      courseId: courseObjectId,
    });
    console.log(videoDoc);

    const result = await videoDoc.save();
    return result || null;
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
}

export default addVideo;
