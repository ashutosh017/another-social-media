"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";

export async function editProfile(values: {
  profilePicUrl?: string;
  username?: string;
  name?: string;
  bio?: string;
}) {
  const me = await getMe();
  if (!me) {
    return;
  }
  try {
    console.log("updating starts");
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
