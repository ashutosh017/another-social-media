"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User, MessageSquare, Plus } from "lucide-react";
import { User as userType } from "@/app/generated/prisma";

export default function BottomBar({
  user,
}: {
  user: Omit<userType, "password">;
}) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background max-w-md mx-auto">
      <div className="flex justify-around py-3">
        <Link
          href={`/${user.username}/feed`}
          className={`flex flex-col items-center ${
            pathname === "/"
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href={`/${user.username}/search`}
          className={`flex flex-col items-center ${
            pathname === "/search"
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link
          href={`/${user.username}/add`}
          className={`flex flex-col items-center ${
            pathname === "#"
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Plus className="h-6 w-6 border border-muted-foreground p-0.5 rounded-md" />
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link
          href={`/${user.username}/messages`}
          className={`flex flex-col items-center ${
            pathname === "/messages"
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link
          href={`/${user.username}`}
          className={`flex flex-col items-center ${
            pathname?.startsWith("/")
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}
