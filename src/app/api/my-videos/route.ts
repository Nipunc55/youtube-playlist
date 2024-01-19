/** @format */

import { NextResponse, NextRequest } from "next/server";

import getMyVideos from "@/lib/getMyVideos";

export async function GET(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const token = request.headers.get("Authorization") || null;

    const pageNumber: number = Number(
      request.nextUrl.searchParams.get("pageNumber") || 0
    );
    const pageSize: number = Number(
      request.nextUrl.searchParams.get("pageSize") || 9
    );

    const videos = await getMyVideos(token, pageNumber, pageSize);
    response.data = videos;
  } catch (error: any) {
    response = { error: true, data: error };
  }

  return NextResponse.json(response);
}
export const dynamic = "force-dynamic";
