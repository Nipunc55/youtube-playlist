import { NextResponse } from "next/server";
import getAllVideos from "@/lib/getAllVideos";
export async function GET(request: Request) {
  console.log("Request Query:", request.json());

  let response = { error: false, data: {} };

  try {
    const videos = await getAllVideos(2);
    response.data = videos;
  } catch (error: any) {
    response = { error: true, data: error };
  }

  console.log("Response:", response);

  return NextResponse.json(response);
}
