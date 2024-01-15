/** @format */

import { NextResponse, NextRequest } from "next/server";

import getAllVideos from "@/lib/getAllVideos";

export async function GET(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const token = request.headers.get("Authorization") || null;
    const id: number = Number(request.nextUrl.searchParams.get("id") || 0);

    const videos = await getAllVideos(id, token);
    response.data = videos;
  } catch (error: any) {
    response = { error: true, data: error };
  }

  return NextResponse.json(response);
}
export const dynamic = "force-dynamic";
