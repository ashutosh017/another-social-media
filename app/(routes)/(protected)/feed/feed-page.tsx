"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircle, Send, Sparkles } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { MeContext } from "@/components/me-context";
import { useRouter } from "next/navigation";
import { FeedType } from "@/app/actions/types";

import { cn } from "@/lib/utils";
import { toggleLikePost, toggleSavePost } from "@/app/actions/posts.actions";
import { formatDistanceToNowStrict } from "date-fns";
import { EmptyFeed } from "./empty-feed";
import FeedSkeleton from "./feed-skeleton";
import { LikesModal } from "@/components/likes-modal";

export default function FeedPage({
  initialFeed,
  hasInitialNewNotifications,
}: {
  initialFeed: FeedType;
  hasInitialNewNotifications: boolean;
}) {
  const randomId = crypto.randomUUID();
  const [newNotifications, setNewNotifications] = useState(false);
  const router = useRouter();
  const me = useContext(MeContext);
  const [feed, setFeed] = useState<FeedType>(null);

  useEffect(() => {
    setFeed(initialFeed);
    setNewNotifications(hasInitialNewNotifications);
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

      {/* Feed */}
      <div className="space-y-4 pb-4">
        {!feed ? (
          <FeedSkeleton />
        ) : (feed ?? initialFeed)?.length === 0 ? (
          <EmptyFeed />
        ) : (
          (feed ?? initialFeed)?.map((post, i) => (
            <Card key={i} className="border-x-0 rounded-none shadow-none">
              <CardHeader className="flex flex-row items-center p-4">
                <Link
                  href={`/${post.user.username}`}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src={post.user.profilePicUrl ?? "/user.png"} />
                  </Avatar>
                  {post.user.username}
                </Link>
              </CardHeader>
              <CardContent
                className="p-0 relative aspect-square cursor-pointer"
                onClick={() => {
                  router.push(`/posts/${post.id}`);
                }}
              >
                <Image
                  src={post.url}
                  alt={`Post ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover w-full h-full"
                  priority={i === 0} // Only the first post is critical
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
                <div
                  onClick={() => router.push(`/posts/${post.id}`)}
                  className="text-sm font-semibold cursor-pointer"
                >
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
        )}
      </div>
    </div>
  );
}
