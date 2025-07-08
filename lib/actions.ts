import axios from "axios";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { backend_url } from "./config";

export const isLoggedIn = async () => {
  const token = (await cookies()).get("token");
  if (!token) {
    redirect("/signin");
  }
};

export const getMe = async (token: string) => {
  try {
    console.log("token: ", token)
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
