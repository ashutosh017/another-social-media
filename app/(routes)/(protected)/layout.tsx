import BottomBar from "@/components/bottom-bar";
import { getMe } from "@/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createContext, useContext } from "react";

export default async function ProtectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/signin");
  }

  return (
      <div className="max-w-md mx-auto ">
        {children}
        <BottomBar />
      </div>
  );
}
