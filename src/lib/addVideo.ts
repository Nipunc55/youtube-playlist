import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Video from "@/models/Video";
import { validateToken } from "@/utils/token";
import Course from "@/models/Course";

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
    const { courseId, url, ...rest } = videoData;

    // Validate and cast courseId if provided
    let courseObjectId;
    if (courseId) {
      if (mongoose.Types.ObjectId.isValid(courseId)) {
        courseObjectId = new mongoose.Types.ObjectId(courseId);
      } else {
        throw new Error("Invalid course format");
      }
    }

    // Step 1: Check if a video with the same URL already exists
    let videoDoc = await Video.findOne({ url });

    // Step 2: If the video does not exist, create a new video
    if (!videoDoc) {
      videoDoc = new Video({
        ...rest,
        url,
        courseId: courseObjectId,
      });
      videoDoc = await videoDoc.save();
    }

    // Step 3: If courseId exists, update the corresponding course by adding the video to the videos array
    if (courseObjectId) {
      await Course.findByIdAndUpdate(
        courseObjectId,
        {
          $addToSet: { videos: videoDoc._id }, // Use $addToSet to avoid duplicate entries in the videos array
        },
        { new: true }
      );
    }

    return videoDoc || null;
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
}
export default addVideo;
