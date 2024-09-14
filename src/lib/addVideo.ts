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

    // Step 1: Create the video document
    const videoDoc = new Video({
      ...rest,
      courseId: courseObjectId,
    });

    const result = await videoDoc.save();

    // Step 2: If courseId exists, update the corresponding course
    if (courseObjectId) {
      await Course.findByIdAndUpdate(
        courseObjectId,
        {
          $push: { videos: result._id }, // Add the new video's ObjectId to the course's videos array
        },
        { new: true } // Return the updated document
      );
    }

    return result || null;
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
}

export default addVideo;
