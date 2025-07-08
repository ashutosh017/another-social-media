import { prisma } from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret_key = process.env.JWT_SECRET ?? "jwt_secret";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        msg: "user not found",
      },
      {
        status: 400,
      }
    );
  }
  const token = await new SignJWT({username})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(secret_key));
  const cookieStore = await cookies();
  cookieStore.set("token", token);
  return NextResponse.json(
    {
      token,
    },
    {
      status: 200,
    }
  );
};
