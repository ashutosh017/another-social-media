"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";

export const searchUsers = async (query: string) => {
  const me = await getMe();
  if (!query.trim() || !me) {
    return [];
  }
  console.log("search called");
  console.log("query: ", query);
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          posts: {
            some: {
              caption: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      profilePicUrl: true,
      name: true,
      username: true,
      following: {
        select: {
          id: true,
          followerId: true,
        },
      },
      receivedFollowRequests: {
        where: {
          senderId: me?.id,
        },
      },
      posts: {
        select: {
          url: true,
          id: true,
        },
      },
      public: true,
      isVerified: true,
    },
  });
  console.log("users:", users);
  return users;
};

export const fetchSearchFeed = async () => {
  const me = await getMe();
  if (!me) {
    return;
  }
  const posts = await prisma.user.findMany({
    where: {
      public: true,
    },
    take: 90,
    select: {
      posts: {
        select: {
          url: true,
          id: true,
        },
        take: 3,
        orderBy: {
          dateCreated: "desc",
        },
      },
    },
  });
  return posts;
};

export const searchUsersToSendMessage = async (query: string) => {
  const me = await getMe();
  if (!query.trim() || !me) {
    return [];
  }
  console.log("search called");
  console.log("query: ", query);
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          posts: {
            some: {
              caption: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      ],
      NOT: {
        username: me.username,
      },
    },
    select: {
      id: true,
      username: true,
    },
  });

  return users;
};
