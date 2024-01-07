/** @format */

import { NextResponse, NextRequest } from "next/server";
import loginUser from "@/lib/login";
interface Credentials {
  email: string;
  password: string;
}
export async function POST(request: NextRequest) {
  let response = { error: false, data: {} };

  try {
    const body = await request.json();
    const { credentials }: { credentials: Credentials } = body || {
      credentials: { email: "", password: "" },
    };

    const login = await loginUser(credentials);

    if (login) {
      response.data = login;
    } else {
      response = { error: true, data: { message: "invalid credential" } };
    }
  } catch (error: any) {
    response = { error: true, data: error };
    console.log(error);
  }

  return NextResponse.json(response);
}
