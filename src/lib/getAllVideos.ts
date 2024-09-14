import dbConnect from "@/lib/mongodb";
import Like from "@/models/Like";
import Video from "@/models/Video";
import mongoose from "mongoose";
import Course from "@/models/Course";

async function getAllVideos(
  courseId: string,
  token: string | null,
  pageNumber: number,
  pageSize: number
): Promise<any> {
  await dbConnect();

  try {
    // Implement token validation if necessary
    // const isValidToken = validateToken(token);
    // if (!isValidToken) {
    //   throw new Error('Invalid authentication token');
    // }
    const _courseId = new mongoose.Types.ObjectId(courseId);

    const videosWithLikeCounts = await Course.aggregate([
      // Step 1: Match the course by ID to get the videos array
      { $match: { _id: _courseId } },

      // Step 2: Unwind the videos array (video IDs)
      { $unwind: "$videos" },

      // Step 3: Convert video ID to ObjectId if necessary (assuming the IDs in the array are strings)
      {
        $addFields: {
          videoId: { $toObjectId: "$videos" }, // Convert string to ObjectId
        },
      },

      // Step 4: Lookup to join the Video collection and get the video details
      {
        $lookup: {
          from: "videos", // Collection to join (Video collection)
          localField: "videoId", // Field from Course to match (converted videoId)
          foreignField: "_id", // Field in Video collection to match
          as: "videoDetails", // New field for the resulting video details
        },
      },

      // Step 5: Unwind the videoDetails array (since lookup will return an array)
      { $unwind: "$videoDetails" },

      // Step 6: Add a field for video ID as a string (for joining with likes collection)
      {
        $addFields: {
          videoIdStr: { $toString: "$videoDetails._id" }, // Convert video _id to string for lookup
        },
      },

      // Step 7: Lookup to join the likes collection and get like details
      {
        $lookup: {
          from: "likes", // Collection to join (Likes collection)
          localField: "videoIdStr", // Local field (stringified video ID)
          foreignField: "videoId", // Field in likes collection to match with videoId
          as: "likes", // The resulting likes array
        },
      },

      // Step 8: Add a field for like count
      {
        $addFields: {
          likeCount: { $size: "$likes" }, // Calculate the size of the likes array
        },
      },

      // Step 9: Project the required fields (Video details + Like count)
      {
        $project: {
          _id: "$videoDetails._id",
          title: "$videoDetails.title",
          description: "$videoDetails.description",
          url: "$videoDetails.url",
          likeCount: 1, // Like count field
          createdAt: "$videoDetails.createdAt",
          categoryId: "$videoDetails.categoryId",
        },
      },

      // Step 10: Pagination (optional, depending on your use case)
      { $skip: pageNumber * pageSize },
      { $limit: pageSize },
    ]);
    // console.log(videosWithLikeCounts);
    // return { status: true, data: videosWithLikeCounts };
    return videosWithLikeCounts;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}

export default getAllVideos;
