import {  jwtVerify } from "jose";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { jwt_secret } from "./lib/config";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl;
  console.log("middleware");
  const publicRoutes = ["/api/signin", "/api/signup"];

  if (publicRoutes.includes(pathname.pathname)) {
    console.log("public route");
    return NextResponse.next();
  }
  try {
    let token = (await headers()).get("Authorization")?.replace("Bearer ", "");
    console.log("token in middleware: ", token);
    if (!token) {
      token = request.cookies.get("token")?.value;
    }
    if (!token) {
      console.log("token does not exist");

      throw new Error("unauthorized");
    }
    console.log("control reached here: ");
    const decode = (await jwtVerify(
      token,
      new TextEncoder().encode(jwt_secret)
    )) as unknown as { payload: { username: string } };

    const username = decode.payload.username;
    if(!username){
      throw new Error("Unauthorized")
    }
    console.log("username in middleware: ", decode);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-username", username);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log("error in middleware: ", error);
    return NextResponse.json(
      {
        msg: error,
      },
      {
        status: 401,
      }
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
