"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";

export async function getFeed(username: string) {
  const me = await getMe();
  if (!me || username !== me.username) {
    return null;
  }
  const posts = await prisma.post.findMany({
    where: {
      user: {
        following: {
          every: {
            followerId: me.id,
          },
        },
      },
    },
    include: {
      likes: {
        select: {
          id: true,
          userId: true,
        },
      },
      comments: {
        select: {
          id: true,
        },
      },
      savedBy: {
        where: {
          userId: me.id,
        },
        select: {
          id: true,
        },
      },
      user: {
        select: {
          profilePicUrl: true,
          username: true,
          name: true,
          isVerified: true,
        },
      },
    },
    take: 3,
    orderBy: {
      dateCreated: "desc",
    },
  });

  return posts;
}
