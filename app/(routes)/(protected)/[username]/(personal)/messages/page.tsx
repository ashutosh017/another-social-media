"use client";

import { getMe } from "@/app/actions/auth.actions";
import { fetchConversations } from "@/app/actions/messages.actions";
import { ConversationsType } from "@/app/actions/types";
import { MeContext } from "@/components/me-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { ArrowLeft, Edit, MessageCircle, Search } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useChatSubscription } from "@/hooks/useChatSubscription";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const [conversations, setCovnersations] = useState<ConversationsType>();
  const params = useParams();
  const username = params.username;
  const me = useContext(MeContext);
  useEffect(() => {
    async function callFetchConversations() {
      const convs = await fetchConversations();
      if (convs) {
        setCovnersations(convs);
      }
    }
    callFetchConversations();
  }, []);

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <button onClick={() => window.history.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold flex-1">{me?.username}</h1>
        <Link href="#" className="ml-auto">
          <Edit className="h-5 w-5" />
        </Link>
      </header>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 bg-muted" />
        </div>
      </div>

      {/* Messages list */}
      <div className="divide-y">
        {conversations ? (
          conversations.length>0?conversations.map((_, i) => (
            <Link
              href={`/${username}/messages/${_.participants[0].user.username}`}
              key={i}
              className="flex items-center p-4 hover:bg-muted/50"
            >
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage
                  src={_.participants[0].user.profilePicUrl ?? "/user.png"}
                  alt={_.participants[0].user.username}
                />
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate">
                    {_.participants[0].user.username}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatDistanceToNowStrict(_.messages[0].dateCreated, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {_.messages[0].content}
                </p>
              </div>
            </Link>
          )):
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
  <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
  <h2 className="text-xl font-semibold">Your messages</h2>
  <p className="text-sm text-muted-foreground">Send private messages to your friends and followers.</p>
  <Button className="mt-4">Send Message</Button>
</div>

        ) : (
        <div className="space-y-4 px-4 py-2">
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 bg-muted rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-1/3" />
        <div className="h-3 bg-muted-foreground rounded w-1/2" />
      </div>
    </div>
  ))}
</div>

        )}
      </div>
    </div>
  );
}
