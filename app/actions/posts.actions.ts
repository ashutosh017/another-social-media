"use server";

import prisma from "@/lib/db";
import { getMe } from "@/app/actions/auth.actions";

export async function fetchPost(postId: string) {
  const userFields = {
    isVerified: true,
    name: true,
    username: true,
    profilePicUrl: true,
  };
  try {
    const me = await getMe();
    if (!me) return;
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        savedBy: {
          where: {
            userId: me.id,
          },
        },
        user: {
          select: userFields,
        },
        likes: {
          select: {
            user: {
              select: {
                ...userFields,
                id: true,
                followers: {
                  select: {
                    followerId: true,
                  },
                },
              },
            },
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
              include: {
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

export async function toggleSavePost(postId: string) {
  try {
    const me = await getMe();
    if (!me) {
      return;
    }
    console.log("save post  called");
    const isSaved = await prisma.savedPost.findFirst({
      where: {
        postId,
        userId: me.id,
      },
    });
    if (isSaved) {
      await prisma.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId: me.id,
          },
        },
      });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: me.id,
          postId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createNewPost(iamgeUrl: string, caption: string) {
  const me = await getMe();
  if (!me) {
    return;
  }
  await prisma.post.create({
    data: {
      url: iamgeUrl,
      caption,
      userId: me.id,
    },
  });
}
