/** @format */
import { NextResponse } from "next/server";
import addVideo from "@/lib/addVideo";
export async function POST(request: Request) {
  let response = { error: false, data: {} };
  try {
    // Parse the request body to get the data sent in the POST request
    const body = await request.json();
    const result = await addVideo(body);

    response.data = result;
  } catch (error: any) {
    response = { error: true, data: error };
  }

  return NextResponse.json(response);
}
