"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User, MessageSquare, Plus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { MeContext } from "./me-context";

export default function BottomBar() {
  const me = useContext(MeContext);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background max-w-md mx-auto">
      <div className="flex justify-around py-3">
        <Link
          href={`/feed`}
          className={`flex flex-col items-center ${
            pathname.includes("/feed")
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href={`/search`}
          className={`flex flex-col items-center ${
            pathname.includes("/search")
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link
          href={`/add`}
          className={`flex flex-col items-center ${
            pathname.includes("/add")
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Plus
            className={cn(
              "h-6 w-6 border-2 p-0.5 rounded-md",
              pathname.includes("/add") ? "border-white" : "border-muted-foreground"
            )}
          />
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link
          href={`/messages`}
          className={`flex flex-col items-center ${
            pathname.includes("/messages")
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link
          href={`/${me?.username}`}
          className={`flex flex-col items-center ${
            pathname===(`/${me?.username}`)
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
