import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const username = (await params).username;
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      posts: {
        select: {
          id: true,
        },
      },
      followers: {
        select: {
          id: true,
        },
      },
      following: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        msg: "no user found",
      },
      {
        status: 200,
      }
    );
  }
  return NextResponse.json(
    {
      user,
    },
    {
      status: 200,
    }
  );
}
