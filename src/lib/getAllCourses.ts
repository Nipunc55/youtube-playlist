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
      // Lookup the Video collection to get video details
      {
        $lookup: {
          from: "videos", // The collection to join with
          localField: "videos", // Array of video IDs in the Course collection
          foreignField: "_id", // The field in the Video collection to match with
          as: "videoDetails", // The name of the new field to add the video details
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
          videos: {
            $map: {
              input: "$videoDetails",
              as: "video",
              in: {
                videoId: "$$video._id",
                videoUrl: "$$video.url",
                // Add more video fields if needed
              },
            },
          },
          likeCount: 1,
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
