"use client";

import { MeContext } from "@/components/me-context";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const EmptyFeed = () => {
  const me = useContext(MeContext);
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center animate-fade-in">
      <div className="bg-muted p-4 rounded-full shadow-md">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-foreground">
        No Posts Yet
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
        Your feed is waiting to come alive. Start following amazing creators to
        see what they're sharing.
      </p>
      <button
        className="mt-6 px-4 py-2 text-sm bg-primary text-black rounded-full shadow hover:shadow-lg transition"
        onClick={() => {
          router.push(`search`);
        }}
      >
        Discover People
      </button>
    </div>
  );
};
