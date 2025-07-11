"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const postId = params.postId as string;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");

  // Mock post data - in a real app, this would be fetched based on postId
  const post = {
    id: postId,
    user: {
      username: `user${postId}`,
      avatar: `/placeholder.svg?height=32&width=32&text=User${postId}`,
      isVerified: false,
    },
    image: `/placeholder.svg?height=600&width=600&text=Post${postId}`,
    caption:
      "This is a detailed caption for the post. It might be longer and contain hashtags, mentions, and emojis! 📸 #photography #instagram #nature",
    likes: 1234,
    timestamp: "2 HOURS AGO",
    location: "New York, NY",
  };

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: {
        username: "friend1",
        avatar: "/placeholder.svg?height=32&width=32&text=F1",
      },
      text: "Amazing shot! 🔥",
      timestamp: "1h",
      likes: 12,
    },
    {
      id: 2,
      user: {
        username: "friend2",
        avatar: "/placeholder.svg?height=32&width=32&text=F2",
      },
      text: "Love this! Where was this taken?",
      timestamp: "45m",
      likes: 8,
    },
    {
      id: 3,
      user: {
        username: "friend3",
        avatar: "/placeholder.svg?height=32&width=32&text=F3",
      },
      text: "Incredible composition and lighting! 📷✨",
      timestamp: "30m",
      likes: 15,
    },
    {
      id: 4,
      user: {
        username: "friend4",
        avatar: "/placeholder.svg?height=32&width=32&text=F4",
      },
      text: "This deserves more likes!",
      timestamp: "20m",
      likes: 5,
    },
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = () => {
    if (comment.trim()) {
      console.log("Adding comment:", comment);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="/" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={post.user.avatar || "/placeholder.svg"}
              alt={post.user.username}
            />
            <AvatarFallback>
              {post.user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.user.username}</p>
            {post.location && (
              <p className="text-xs text-muted-foreground">{post.location}</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex flex-col">
        {/* Post Image */}
        <div className="relative aspect-square w-full">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={`Post by ${post.user.username}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Post Actions */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className="p-0"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button variant="ghost" size="icon" className="p-0">
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="p-0">
                <Send className="h-6 w-6" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="p-0"
            >
              <Bookmark
                className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-sm">
              {post.likes.toLocaleString()} likes
            </p>
            <div className="text-sm">
              <Link
                href={`/profile/${post.user.username}`}
                className="font-semibold"
              >
                {post.user.username}
              </Link>{" "}
              {post.caption}
            </div>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="flex-1">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-sm mb-3">Comments</h3>
            <ScrollArea className="space-y-4 max-h-96">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 mb-4">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage
                      src={comment.user.avatar || "/placeholder.svg"}
                      alt={comment.user.username}
                    />
                    <AvatarFallback>
                      {comment.user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm">
                          <Link
                            href={`/profile/${comment.user.username}`}
                            className="font-semibold"
                          >
                            {comment.user.username}
                          </Link>{" "}
                          {comment.text}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {comment.timestamp}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {comment.likes} likes
                          </span>
                          <button className="text-xs text-muted-foreground font-semibold">
                            Reply
                          </button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-2"
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Add Comment */}
          <div className="p-4 border-t sticky bottom-0 bg-background">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32&text=You"
                  alt="Your avatar"
                />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border-none shadow-none focus-visible:ring-0 px-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleComment();
                  }}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              {comment.trim() && (
                <Button
                  onClick={handleComment}
                  size="sm"
                  variant="ghost"
                  className="text-blue-500 font-semibold"
                >
                  Post
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
