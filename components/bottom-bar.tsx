"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User, Plus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { MeContext } from "./me-context";

export default function BottomBar() {
  const me = useContext(MeContext);
  const pathname = usePathname();

  const navItems = [
    { href: "/feed", icon: Home, label: "Home" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/add", icon: Plus, label: "Add", isSpecial: true },
    { href: "/messages", icon: MessageCircle, label: "Messages" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background max-w-md mx-auto z-50">
      <div className="flex justify-around ">
        {navItems.map(({ href, icon: Icon, label, isSpecial }) => {
          const isActive = pathname.includes(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center  py-2", // added padding
                isActive
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              <div className="flex flex-col items-center justify-center w-16 h-14">
                {" "}
                {/* fixed size touch target */}
                <Icon
                  className={cn(
                    "h-6 w-6",
                    isSpecial && "border-2 p-0.5 rounded-md",
                    isSpecial &&
                      (isActive
                        ? "border-black dark:border-white"
                        : "border-muted-foreground")
                  )}
                />
                <span className="text-xs mt-1">{label}</span>
              </div>
            </Link>
          );
        })}

        {/* Profile link */}
        <Link
          href={`/${me?.username}`}
          className={cn(
            "flex flex-col items-center justify-center  ",
            pathname === `/${me?.username}`
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          <div className="flex flex-col items-center justify-center w-16 h-14">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
