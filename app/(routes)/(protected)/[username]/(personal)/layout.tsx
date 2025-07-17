import axios from "axios";
import { backend_url } from "@/lib/config";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getMe } from "@/app/actions/auth.actions";

export default async function UserPersonalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const username = (await params).username;
  const me = await getMe();
  const myUsername = me?.username;
  if (myUsername !== username) {
    notFound();
  }
  return <div>{children}</div>;
}
