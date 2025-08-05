"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";

export async function toggleCommentLike(commentId: string) {
  const me = await getMe();
  if (!me?.id) {
    return;
  }
  const alreadyLiked = await prisma.commentLike.findFirst({
    where: {
      commentId: commentId,
      userId: me?.id,
    },
  });
  if (alreadyLiked) {
    await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId: me.id,
          commentId: commentId,
        },
      },
    });
  } else {
    await prisma.commentLike.create({
      data: {
        commentId,
        userId: me.id,
      },
    });
  }
}
export async function toggleReplyLike(replyId: string) {
  const me = await getMe();
  if (!me) {
    return;
  }
  const alreadyLiked = await prisma.commentReply.findFirst({
    where: {
      id: replyId,
      likes: {
        has: me.id,
      },
    },
    select: { id: true, likes: true },
  });
  if (alreadyLiked) {
    await prisma.commentReply.update({
      where: {
        id: replyId,
      },
      data: {
        likes: {
          set: alreadyLiked.likes.filter((userId) => userId !== me.id),
        },
      },
    });
  }else{
    await prisma.commentReply.update({
        where:{
            id:replyId
        },
        data:{
            likes:{
                push:me.id
            }
        }
    })
  }
}

export async function addComment(
  postId: string,
  comment: string,
  parentId?: string | null
) {
  try {
    const me = await getMe();
    if (!me?.id) {
      return;
    }
    if (parentId) {
      await prisma.commentReply.create({
        data: {
          text: comment,
          parentId,
          userId: me.id,
          postId,
        },
      });
    } else {
      await prisma.comment.create({
        data: {
          text: comment,

          user: {
            connect: {
              id: me?.id,
            },
          },

          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
    }
  } catch (error) {
    // console.log("error in creating comment: ", error);
  }
}
