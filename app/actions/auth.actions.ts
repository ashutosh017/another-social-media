"use server";
import { jwt_secret } from "@/lib/config";
import prisma from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { User } from "../generated/prisma";

export async function signin(values: { username: string; password: string }) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: values.username,
        password: values.password,
      },
    });
    if (!user) {
      return {
        error: "no user exists",
      };
    }

    const token = await new SignJWT({ username: values.username })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(jwt_secret));
    const cookieStore = await cookies();
    cookieStore.set("token", token);
    console.log(values.username);
  } catch (error) {
    console.log(error);
    return;
  }
  redirect(`/${values.username}`);
}
export async function signup(values: {
  name: string;
  username: string;
  password: string;
}) {
  try {
    // TODO: hash the password in production
    // const hashedPassword = await hash(values.password, 10); /
    await prisma.user.create({
      data: {
        name: values.name,
        username: values.username,
        password: values.password,
      },
    });

    signin({ username: values.username, password: values.password });
    return {
      success: true,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export const getMe = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    redirect("/signin");
  }
  const verify = (await jwtVerify(
    token,
    new TextEncoder().encode(jwt_secret)
  )) as unknown as {
    payload: {
      username: string;
    };
  };
  const username = verify.payload.username;
  console.log("username in geme fn: ", verify.payload)
  const user: User | null = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (user) {
    const { password, ...safeUser } = user;
    console.log("safe user in get me fn: ", safeUser);
    return safeUser;
  }
  return null;
};
