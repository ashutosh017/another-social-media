"use server";

import prisma from "@/lib/db";
import { connect } from "http2";
import { getMe } from "@/app/actions/auth.actions";

export async function fetchPost(postId: string) {
  const userFields = {
    isVerified: true,
    name: true,
    username: true,
    profilePicUrl: true,
  };
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: userFields,
        },
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            dateCreated: true,
            id: true,
            text: true,
            user: {
              select: userFields,
            },
            likes: {
              select: {
                id: true,
                user: {
                  select: userFields,
                },
              },
            },
            replies: {
              include: {
                user: {
                  select: userFields,
                },
              },
            },
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function toggleLikePost(postId: string | null) {
  if (!postId) return;

  const me = await getMe();
  if (!me?.id) return;

  const existing = await prisma.postLike.findUnique({
    where: {
      postId_userId: {
        postId,
        userId: me.id,
      },
    },
  });

  if (existing) {
    await prisma.postLike.delete({
      where: {
        postId_userId: {
          postId,
          userId: me.id,
        },
      },
    });
  } else {
    await prisma.postLike.create({
      data: {
        postId,
        userId: me.id,
      },
    });
  }
}
