"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { backend_url } from "./config";
import { prisma } from "./db";

export const isLoggedIn = async () => {
  const token = (await cookies()).get("token");
  if (!token) {
    redirect("/signin");
  }
};

export const getMe = async (token: string) => {
  try {
    console.log("token: ", token);
    const res = await axios.get(`${backend_url}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res: ", res.data);
    return res.data.user;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export const searchUsers = async (query: string) => {
  if (!query.trim()) {
    return [];
  }
  console.log("search called")
  console.log("query: ", query)
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
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
      isVerified:true
    },
  });
  console.log("users:", users)
  return users;
};
