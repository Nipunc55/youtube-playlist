/** @format */

import { NextResponse, NextRequest } from "next/server";
import signUp from "@/lib/signUp";
interface Credentials {
  email: string;
  password: string;
}
export async function POST(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const body = await request.json();

    const userData: inputUser = body;

    const register = await signUp(userData);

    if (register) {
      response.data = register;
    }
    // response = { error: true, data: { message: "invalid credential" } };
  } catch (error: any) {
    response = { error: true, data: error };
    console.log(error);
  }

  return NextResponse.json(response);
}
