/** @format */
import { NextResponse, NextRequest } from "next/server";
import addCourse from "@/lib/addCourse";

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
    const result = await addCourse(body);

    response.data = result;
  } catch (error: any) {
    response = { error: true, data: error.message };
  }

  return NextResponse.json(response);
}
