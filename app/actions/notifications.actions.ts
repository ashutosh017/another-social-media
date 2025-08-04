"use server";
import prisma from "@/lib/db";
import { getMe } from "./auth.actions";
import { Notification } from "@/lib/generated/prisma";

export async function fetchNotifications() {
  const me = await getMe();
  if (!me) {
    return;
  }
  const notifications = await prisma.notification.findMany({
    where: {
      recipientId: me.id,
    },
    include: {
      actor: {
        omit: {
          password: true,
        },
      },
      comment: {
        include: {
          post: {
            select: {
              url: true,
            },
          },
        },
      },
      commentReply: {
        include: {
          post: {
            select: {
              url: true,
            },
          },
        },
      },
      follow: true,
      followRequest: true,
      like: true,
      post: true,
    },
    orderBy: {
      dateCreated: "desc",
    },
  });
  console.log("notifications: ", notifications);
  return notifications;
}

export async function createNotification(
  actorId: string,
  recipientId: string,
  type: Notification["type"],
  values: {
    postId?: string;
    commentId?: string;
    commentReplyId?: string;
    followId?: string;
    followRequestId?: string;
    likeId?: string;
  }
) {
  const validData = {
    type,
    actorId,
    recipientId,
  } as {
    type: Notification["type"];
    actorId: string;
    recipientId: string;
    postId?: string;
    commentId?: string;
    commentReplyId?: string;
    followId?: string;
    followRequestId?: string;
    likeId?: string;
  };

  switch (type) {
    case "LIKE":
      if (!values.likeId || !values.postId)
        throw new Error("Missing likeId or postId");
      validData.likeId = values.likeId;
      validData.postId = values.postId;
      break;
    case "COMMENT":
      if (!values.commentId || !values.postId)
        throw new Error("Missing commentId or postId");
      validData.commentId = values.commentId;
      validData.postId = values.postId;
      break;
    case "COMMENT_REPLY":
      if (!values.commentReplyId) throw new Error("Missing commentReplyId");
      validData.commentReplyId = values.commentReplyId;
      break;
    case "FOLLOW":
      if (!values.followId) throw new Error("Missing followId");
      validData.followId = values.followId;
      break;
    case "FOLLOW_REQUEST":
      if (!values.followRequestId) throw new Error("Missing followRequestId");
      validData.followRequestId = values.followRequestId;
      break;
    case "MENTION":
      if (!values.postId && !values.commentId)
        throw new Error("Missing postId or commentId for mention");
      if (values.postId) validData.postId = values.postId;
      if (values.commentId) validData.commentId = values.commentId;
      break;
    default:
      throw new Error(`Unsupported notification type: ${type}`);
  }

  return await prisma.notification.create({ data: validData });
}

export async function markAsSeenNotification(id: string) {
  console.log("marked notification called");
  await prisma.notification.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
}

export async function deleteNotification(id: string) {
  await prisma.notification.delete({
    where: {
      id,
    },
  });
}

export const hasNewNotifications = async () => {
  const me = await getMe();
  if (!me) return;
  const notifications = await prisma.notification.findMany({
    where: {
      recipientId: me.id,
    },
    select: {
      id: true,
      isRead: true,
    },
  });
  const newNotifications = notifications.some((n) => n.isRead === true);
  // console.log("new notifications: ", newNotifications)
  return newNotifications;
};
