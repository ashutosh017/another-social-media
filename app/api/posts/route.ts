import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    postUrl,
    caption,
  }: {
    postUrl: string;
    caption: string;
  } = body;
  const username = (await headers()).get("x-username");
  if (!username) {
    return NextResponse.json(
      {
        msg: "Unauthorized",
      },
      {
        status: 403,
      }
    );
  }
  try {
    const res = await prisma.post.create({
      data: {
        url: postUrl,
        caption,
        user: {
          connect: {
            username,
          },
        },
      },
    });
    return NextResponse.json(
      {
        msg: "post uploaded",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        msg: "upload failed",
        reason: error,
      },
      { status: 400 }
    );
  }
}
