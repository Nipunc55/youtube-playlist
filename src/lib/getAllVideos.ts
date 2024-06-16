import dbConnect from "@/lib/mongodb";
import Video from "@/models/Video";

async function getAllVideos(
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

    const videos = await Video.find()
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .exec();

    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}

export default getAllVideos;
