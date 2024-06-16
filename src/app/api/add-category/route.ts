/** @format */
import { NextResponse, NextRequest } from "next/server";
import addCategory from "@/lib/addCategory";

export async function POST(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    // Parse the request body to get the data sent in the POST request
    const body = await request.json();

    // Add the new category using the addCategory function
    const result = await addCategory(body);

    response.data = result;
  } catch (error: any) {
    response = { error: true, data: error.message };
  }

  return NextResponse.json(response);
}
