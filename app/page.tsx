'use server'
import { getMe } from "@/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/signin");
  } else {
    const user = await getMe(token);
    redirect(`/${user.username}`);
  }

  return <div>hiii</div>;
}
