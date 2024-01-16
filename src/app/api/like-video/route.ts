import { NextResponse } from "next/server";

import addLike from "@/lib/addLike";
export async function POST(request: Request) {
  let response = { error: false, data: {} };
  try {
    const token = request.headers.get("Authorization");
    if (!token) response = { error: true, data: { message: "auth needed" } };
    // Parse the request body to get the data sent in the POST request
    const body = await request.json();
    const result = await addLike(body, token);

    response.data = result;
  } catch (error: any) {
    response = {
      error: true,
      data: { status: false, message: `${error?.message}` },
    };
  }

  return NextResponse.json(response);
}
