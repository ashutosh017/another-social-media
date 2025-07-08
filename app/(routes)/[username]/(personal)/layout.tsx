import axios from "axios";
import { backend_url } from "@/lib/config";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function UserPersonalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    username: string;
  };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const username = params.username;
  const me = await axios.get(`${backend_url}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const myUsername = me.data.user.username;
  if(myUsername!==username){
    notFound();
  }
  return <div>{children}</div>;
}
