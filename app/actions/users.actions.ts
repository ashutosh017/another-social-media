"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";

export const searchUsers = async (query: string) => {
  if (!query.trim()) {
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
      ],
    },
    select: {
      id: true,
      profilePicUrl: true,
      name: true,
      username: true,
      followers: {
        select: {
          id: true,
        },
      },
      isVerified: true,
    },
  });
  console.log("users:", users);
  return users;
};

export const fetchUsertDetails = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      posts: true,
      followers: true,
      following: true,
      sentFollowRequests: true,
      receivedFollowRequests: true,
    },
    omit: {
      password: true,
    },
  });
  return user;
};

