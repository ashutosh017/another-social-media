"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Home, Search, User, MessageSquare, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomBar() {
  const user = useParams();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background max-w-md mx-auto">
      <div className="flex justify-around py-3">
        <Link
          href={`/${user.username}/feed`}
          className={`flex flex-col items-center ${
            pathname === `/${user.username}/feed`
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
            pathname === `/${user.username}/search`
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
            pathname === `/${user.username}/add`
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Plus
            className={cn(
              "h-6 w-6 border-2 p-0.5 rounded-md",
              pathname === `/${user.username}/add`
                ? "border-white"
                : "border-muted-foreground"
            )}
          />
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link
          href={`/${user.username}/messages`}
          className={`flex flex-col items-center ${
            pathname === `/${user.username}/messages`
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
            pathname === `/${user.username}`
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
