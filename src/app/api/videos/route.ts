/** @format */

import { NextResponse, NextRequest } from "next/server";
import getAllVideos from "@/lib/getAllVideos";

export async function GET(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const token = request.headers.get("Authorization") || null;
    const id = request.nextUrl.searchParams.get("id");
    const pageNumber: number = Number(
      request.nextUrl.searchParams.get("pageNumber") || 0
    );
    const pageSize: number = Number(
      request.nextUrl.searchParams.get("pageSize") || 9
    );

    const videos = await getAllVideos(token, pageNumber, pageSize);
    response.data = videos;
  } catch (error: any) {
    response = { error: true, data: error.message };
  }

  return NextResponse.json(response);
}

export const dynamic = "force-dynamic";
