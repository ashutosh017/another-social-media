import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("me route hit************");

  const username = (await headers()).get("x-username");
  console.log("username in me route: ",username)
  if (!username) {
    return NextResponse.json(
      {
        msg: "Invalid jwt",
      },
      {
        status: 401,
      }
    );
  }
  console.log("username: ", username);
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        msg: "user does not exist",
      },
      {
        status: 401,
      }
    );
  }
  const { password, ...safeUser } = user;
  console.log("safeuser: ", safeUser);
  return NextResponse.json(
    {
      user: safeUser,
    },
    {
      status: 200,
    }
  );
};
