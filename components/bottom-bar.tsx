"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User, MessageSquare, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { User as PrismaUser } from "@/app/generated/prisma";
import { useContext } from "react";
import { MeContext } from "./me-context";

export default function BottomBar() {
  const me = useContext(MeContext);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background max-w-md mx-auto">
      <div className="flex justify-around py-3">
        <Link
          href={`/${me?.username}//feed`}
          className={`flex flex-col items-center ${
            pathname === `/feed`
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href={`/${me?.username}//search`}
          className={`flex flex-col items-center ${
            pathname === `/search`
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link
          href={`/${me?.username}//add`}
          className={`flex flex-col items-center ${
            pathname === `/add`
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <Plus
            className={cn(
              "h-6 w-6 border-2 p-0.5 rounded-md",
              pathname === `/add` ? "border-white" : "border-muted-foreground"
            )}
          />
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link
          href={`/${me?.username}//messages`}
          className={`flex flex-col items-center ${
            pathname === `/messages`
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link
          href={`/${me?.username}`}
          className={`flex flex-col items-center ${
            pathname === ``
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
