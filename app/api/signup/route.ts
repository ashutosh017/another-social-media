import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, username, password } = await req.json();
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password,
      },
    });
    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "error signing up",
        
      },
      {
        status: 400,
      }
    );
  }
}
