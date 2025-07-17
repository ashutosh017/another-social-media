"use server";

import prisma from "@/lib/db";

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
