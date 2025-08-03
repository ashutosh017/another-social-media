"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";

export async function editProfile(values: {
  profilePicUrl?: string;
  username?: string;
  name?: string;
  bio?: string;
  public?:boolean
}) {
  const me = await getMe();
  if (!me) {
    return;
  }
  try {
    console.log("updating starts");
    console.log("values: ",values)
    await prisma.user.update({
      where: {
        id: me.id,
      },
      data:values
    });
    console.log("updating end");
  } catch (error) {
    console.log("error in updating: ", error);
  }
  console.log("edit profile called")
}

export const fetchUserDetails = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      posts: true,
      tagged:true,
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

