"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, Heart, MessageCircle, Send, Sparkles } from "lucide-react";
import { cookies } from "next/headers";
import { getMe } from "@/app/actions/auth.actions";
import { useContext, useEffect, useState } from "react";
import { MeContext } from "@/components/me-context";
import { useParams, useRouter } from "next/navigation";
import { FeedType } from "@/app/actions/types";
import { getFeed } from "@/app/actions/feed.actions";
import { cn } from "@/lib/utils";
import { toggleLikePost, toggleSavePost } from "@/app/actions/posts.actions";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { hasNewNotifications } from "@/app/actions/notifications.actions";

export default function FeedPage() {
  const randomId = crypto.randomUUID();
  const [newNotifications, setNewNotifications] = useState(false);
  const router = useRouter();
  const me = useContext(MeContext);
  const username = useParams<{ username: string }>().username;
  const [feed, setFeed] = useState<FeedType>(null);

  useEffect(() => {
    async function callGetFeed() {
      if (!me) return;
      const res = await getFeed(me.username);
      if (!res) {
        return;
      }
      setFeed(res);
    }
    async function checkNewNotifications() {
      const check = await hasNewNotifications();
      if (check) {
        setNewNotifications(true);
      }
    }
    callGetFeed();
    checkNewNotifications();
  }, []);
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dopaminly</h1>
        <div className="flex  items-center">
          {/* Notifications Button */}
          <Link href="notifications">
            <Button variant="ghost" size="sm" className="relative">
              {/* Red Dot */}

              {newNotifications && (
                <div className="absolute top-1 right-1 w-1 h-1 bg-red-500 rounded-full" />
              )}
              <Heart className="h-6 w-6" />
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>

          {/* Messages Button */}
          <Link href="messages">
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Stories */}
      {/* <div className="px-4 py-4 border-b">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-1">
                <div className="rounded-full ring-2 ring-pink-500 p-0.5">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24.png`}
                      alt={`User ${i + 1}`}
                    />
                    <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs">user{i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div> */}

      {/* Feed */}
      <div className="space-y-4 pb-4">
        {feed ? (
          feed.length > 0 ? (
            feed.map((post, i) => (
              <Card key={i} className="border-x-0 rounded-none shadow-none">
                <CardHeader className="flex flex-row items-center p-4">
                  <Link
                    href={`/${post.user.username}`}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage
                        src={post.user.profilePicUrl ?? "/user.png"}
                      />
                    </Avatar>
                    {post.user.username}
                  </Link>
                  {/* <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 ml-auto rounded-full"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button> */}
                </CardHeader>
                <CardContent
                  className="p-0"
                  onClick={() => {
                    router.push(`/posts/${post.id}`);
                  }}
                >
                  <Image
                    src={post.url}
                    width={400}
                    height={400}
                    alt={`Post ${i + 1}`}
                    className="object-cover aspect-square w-full"
                  />
                </CardContent>
                <CardFooter className="grid gap-2 p-4">
                  <div className="flex items-center w-full">
                    <Button
                      onClick={() => {
                        toggleLikePost(post.id);
                        me?.id &&
                          setFeed(
                            (prev) =>
                              prev &&
                              prev.map((p) =>
                                p.id === post.id
                                  ? {
                                      ...p,
                                      likes: p.likes.some(
                                        (l) => l.userId === me?.id
                                      )
                                        ? p.likes.filter(
                                            (l) => l.userId !== me.id
                                          )
                                        : [
                                            ...p.likes,
                                            {
                                              id: `new-like-${randomId}`,
                                              userId: me.id,
                                            },
                                          ],
                                    }
                                  : p
                              )
                          );
                      }}
                      variant="ghost"
                      size="icon"
                    >
                      <Heart
                        className={cn(
                          "w-6 h-6",
                          post.likes.length > 0 &&
                            post.likes.some((val) => val.userId === me?.id) &&
                            "fill-red-500 text-red-700"
                        )}
                      />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button
                      onClick={() => router.push(`/posts/${post.id}`)}
                      variant="ghost"
                      size="icon"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="sr-only">Comment</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Send className="w-6 h-6" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button
                      onClick={() => {
                        toggleSavePost(post.id);
                        me?.id &&
                          setFeed(
                            (prev) =>
                              prev &&
                              prev.map((p) =>
                                p.id === post.id
                                  ? {
                                      ...p,
                                      savedBy:
                                        p.savedBy.length > 0
                                          ? []
                                          : [{ id: `new-save-${randomId}` }],
                                    }
                                  : p
                              )
                          );
                      }}
                      variant="ghost"
                      size="icon"
                      className="ml-auto"
                    >
                      <Bookmark
                        className={cn(
                          "w-6 h-6 ",
                          post.savedBy.length > 0 && "fill-white"
                        )}
                      />

                      <span className="sr-only">Save</span>
                    </Button>
                  </div>
                  <div className="text-sm font-semibold">
                    {post.likes.length} likes
                  </div>
                  <div className="text-sm">
                    <Link href="/profile" className="font-semibold">
                      {post.user.username}
                    </Link>{" "}
                    {post.caption}
                  </div>
                  {post.comments.length > 0 && (
                    <div
                      onClick={() => router.push(`/posts/${post.id}`)}
                      className="text-sm text-muted-foreground"
                    >
                      View all {post.comments.length} comments
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNowStrict(post.dateCreated, {
                      addSuffix: true,
                    })}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center animate-fade-in">
              <div className="bg-muted p-4 rounded-full shadow-md">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-foreground">
                No Posts Yet
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Your feed is waiting to come alive. Start following amazing
                creators to see what they're sharing.
              </p>
              <button
                className="mt-6 px-4 py-2 text-sm bg-primary text-black rounded-full shadow hover:shadow-lg transition"
                onClick={() => {
                  // Optional: trigger search modal or navigation
                  router.push(`${me?.username}/search`);
                }}
              >
                Discover People
              </button>
            </div>
          )
        ) : (
        <div className="space-y-8 animate-pulse px-4 py-6">
  {Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="space-y-4">
      {/* Header: Avatar + Username */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted" />
        <div className="h-4 w-24 bg-muted rounded" />
      </div>

      {/* Image placeholder */}
      <div className="w-full h-[400px] bg-muted rounded-xl" />

      {/* Actions row */}
      <div className="flex gap-4">
        <div className="w-6 h-6 bg-muted rounded" />
        <div className="w-6 h-6 bg-muted rounded" />
        <div className="w-6 h-6 bg-muted rounded" />
      </div>

      {/* Caption */}
      <div className="space-y-2">
        <div className="w-3/4 h-4 bg-muted rounded" />
        <div className="w-1/2 h-4 bg-muted rounded" />
      </div>

      <hr className="border-muted/50" />
    </div>
  ))}
</div>

        )}
      </div>
    </div>
  );
}
