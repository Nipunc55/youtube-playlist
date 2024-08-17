import dbConnect from "@/lib/mongodb";
import Like from "@/models/Like";
import Video from "@/models/Video";
import mongoose from "mongoose";

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

    const videosWithLikeCounts = await Video.aggregate([
      // Skip to the correct page
      { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
      { $skip: pageNumber * pageSize },

      // Limit to the page size
      { $limit: pageSize },
      {
        $addFields: {
          _idStr: { $toString: "$_id" },
        },
      },
      // Perform a left join with the Like collection
      {
        $lookup: {
          from: "likes",
          localField: "_idStr",
          foreignField: "videoId",
          as: "likes",
        },
      },
      // Add a field for the count of likes
      {
        $addFields: {
          likeCount: { $size: "$likes" },
        },
      },
      // Optionally project the fields you want to return
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          likeCount: 1,
          createdAt: 1,
          categoryId: 1,
          url: 1,
          // Include other fields you need
        },
      },
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
