/** @format */

import { NextResponse, NextRequest } from "next/server";
import getAllCategories from "@/lib/getCategories";

export async function GET(request: NextRequest) {
  let response = { error: false, data: {} };
  try {
    const categories = await getAllCategories();

    response.data = categories;
  } catch (error: any) {
    response = { error: true, data: error };
    console.log(error);
  }

  return NextResponse.json(response);
}
