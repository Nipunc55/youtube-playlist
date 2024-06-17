/** @format */
import { NextResponse, NextRequest } from "next/server";
import addVideo from "@/lib/addVideo";

export async function POST(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const token = request.headers.get("Authorization");
    if (!token) {
      return NextResponse.json({
        error: true,
        data: { message: "Authentication needed" },
      });
    }

    // Parse the request body to get the data sent in the POST request
    const body = await request.json();
    const result = await addVideo(body, token);

    response.data = result;
  } catch (error: any) {
    response = { error: true, data: error.message };
  }

  return NextResponse.json(response);
}
