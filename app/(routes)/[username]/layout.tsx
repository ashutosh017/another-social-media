import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BottomBar from "@/components/bottom-bar";
import { User } from "@/app/generated/prisma";
import { getMe } from "@/lib/actions";

export default async function ProtectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/signin");
  }
  const user: Omit<User, "password"> = await getMe(token);

  return (
    <div className="max-w-md mx-auto ">
      {children}
      <BottomBar user={user} />
    </div>
  );
}
