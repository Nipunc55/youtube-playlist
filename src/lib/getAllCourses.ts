import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

async function getAllCourse(
  token: string | null,
  pageNumber: number,
  pageSize: number
): Promise<any> {
  await dbConnect();

  try {
    const coursesWithVideoDetails = await Course.aggregate([
      // Skip to the correct page
      { $skip: pageNumber * pageSize },

      // Limit to the page size
      { $limit: pageSize },

      // // Unwind the videos array to process each video ID separately
      // { $unwind: "$videos" },

      // Lookup the Video collection to get video details
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "courseId",
          as: "videoDetails",
        },
      },

      // Unwind the videoDetails array to process each video detail
      { $unwind: "$videoDetails" },

      // Group the data back into the course format
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          description: { $first: "$description" },
          createdAt: { $first: "$createdAt" },
          categoryId: { $first: "$categoryId" },
          url: { $first: "$url" },
          videos: {
            $push: {
              videoId: "$videoDetails._id",
              videoUrl: "$videoDetails.url",
            },
          },
          likeCount: { $first: "$likeCount" },
        },
      },

      // Optionally project the fields you want to return
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          createdAt: 1,
          categoryId: 1,
          url: 1,
          videos: 1,
          likeCount: 1,
          // Include other fields you need
        },
      },
    ]);
    // console.log(videosWithLikeCounts);
    // return { status: true, data: videosWithLikeCounts };
    return coursesWithVideoDetails;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}

export default getAllCourse;
