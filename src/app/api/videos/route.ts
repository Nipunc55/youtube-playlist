/** @format */

import { NextResponse, NextRequest } from "next/server";

import getAllVideos from "@/lib/getAllVideos";

export async function GET(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const id: number = Number(2);

    const videos = await getAllVideos(id);
    response.data = videos;
  } catch (error: any) {
    response = { error: true, data: error };
  }

  return NextResponse.json(response);
}
