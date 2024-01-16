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

    const { email, password }: Credentials = body || {
      credentials: { email: "", password: "" },
    };

    const login = await loginUser({ email, password });

    if (login) {
      // console.log(login);

      response.data = login;
    } else {
      response = {
        error: true,
        data: { status: false, message: "invalid credential" },
      };
    }
  } catch (error: any) {
    response = { error: true, data: { status: false, message: `${error}` } };
    console.log(error);
  }

  return NextResponse.json(response);
}
