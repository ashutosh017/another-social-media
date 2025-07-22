"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";

const follow = async (followerId: string, followingId: string) => {
  await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
};
const unFollow = async (followerId: string, followingId: string) => {
  await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
};

const createFollowRequest = async (senderId: string, receiverId: string) => {
  await prisma.followRequest.create({
    data: {
      senderId,
      receiverId,
    },
  });
};

const deleteFollowRequest = async (senderId: string, receiverId: string) => {
  await prisma.followRequest.delete({
    where: {
      senderId_receiverId: {
        senderId,
        receiverId,
      },
    },
  });
};

export const sendUnsendFollowRequest = async (toUserId: string) => {
  const me = await getMe();
  const toUser = await prisma.user.findFirst({
    where: {
      id: toUserId,
    },
    select: {
      public: true,
    },
  });
  if (!me || !toUser) {
    return;
  }

  const doIFollow = await prisma.follow.findFirst({
    where: {
      followerId: me.id,
      followingId: toUserId,
    },
  });
  if (doIFollow) {
    unFollow(me.id, toUserId);
    return;
  }
  const isToUserAccountPrivate = !toUser.public;

  if (isToUserAccountPrivate) {
    createFollowRequest(me.id, toUserId);
    return;
  }
  follow(me.id, toUserId);
};

export const acceptRejectFollowRequest = async (
  fromUserId: string,
  acceptFollow: boolean
) => {
  const me = await getMe();
  const fromUser = await prisma.user.findFirst({
    where: {
      id: fromUserId,
    },
  });
  if (!me || !fromUser) {
    return;
  }
  deleteFollowRequest(fromUserId, me.id);
  if (acceptFollow) {
    follow(fromUserId, me.id);
  }
};

export const fetchFollowers = async (username: string) => {
  try {
    const followers = await prisma.follow.findMany({
      where: {
        following: {
          username,
        },
      },
      select: {
        dateCreated: true,
        follower: {
          select: {
            profilePicUrl: true,
            username: true,
            name: true,
            receivedFollowRequests: {
              where: {
                sender: {
                  username,
                },
              },
            },
            isVerified: true,
            id: true,
            following: {
              where: {
                follower: {
                  username,
                },
              },
            },
          },
        },
      },
    });
    return followers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchFollowing = async (username: string) => {
  try {
    const following = await prisma.follow.findMany({
      where: {
        follower: {
          username,
        },
      },
      select: {
        dateCreated: true,
        following: {
          select: {
            profilePicUrl: true,
            username: true,
            name: true,
            isVerified: true,
            id: true,
            following: true,
          },
        },
      },
    });
    return following;
  } catch (error) {
    console.log(error);
    return null;
  }
};
