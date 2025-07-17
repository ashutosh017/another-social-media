"use server";
import { redirect } from "next/navigation";
import { getMe } from "./actions/auth.actions";

export default async function page() {
  const user = await getMe();
  redirect(`/${user?.username}`);

  return <div>hiii</div>;
}
