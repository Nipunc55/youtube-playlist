/** @format */

import { NextResponse, NextRequest } from "next/server";
import signUp from "@/lib/signUp";
import { inputUser } from "@/lib/signUp"; // Import the inputUser interface

export async function POST(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const body = await request.json();

    const userData: inputUser = body;

    const register = await signUp(userData);

    response.data = register;
  } catch (error: any) {
    response = { error: true, data: error.message };
    console.log(error);
  }

  return NextResponse.json(response);
}
