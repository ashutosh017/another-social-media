"use client";

import { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { MeContext } from "./me-context";
interface LikesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  likes: {
    user: {
      id: string;
      name: string;
      username: string;
      profilePicUrl: string | null;
      isVerified: boolean;
      followers: { followerId: string }[];
    };
  }[];
  totalLikes: number;
}

export function LikesModal({
  open,
  onOpenChange,
  likes,
  totalLikes,
}: LikesModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const me = useContext(MeContext);
  if (!me) return;
  const [followStates, setFollowStates] = useState<Record<string, boolean>>(
    likes.reduce(
      (acc, user) => ({
        ...acc,
        [user.user.id]: user.user.followers.some(
          ({ followerId }) => followerId === me.id
        ),
      }),
      {}
    )
  );

  // Filter likes based on search query
  const filteredLikes = likes.filter(
    ({ user }) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollow = (userId: string, isCurrentlyFollowing: boolean) => {
    setFollowStates((prev) => ({
      ...prev,
      [userId]: !isCurrentlyFollowing,
    }));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-center">Likes</DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 pr-9 bg-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Likes List */}
        <ScrollArea className="max-h-[400px]">
          <div className="px-4 pb-4">
            {filteredLikes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No results found for "${searchQuery}"`
                    : "No likes yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLikes.map((user) => (
                  <div
                    key={user.user.id}
                    className="flex items-center justify-between"
                  >
                    <Link
                      href={`/profile/${user.user.username}`}
                      className="flex items-center gap-3 flex-1 hover:bg-muted/50 rounded-lg p-2 -m-2"
                      onClick={() => onOpenChange(false)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={user.user.profilePicUrl || "/user.png"}
                          alt={user.user.username}
                        />
                        <AvatarFallback>
                          {user.user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold truncate">
                            {user.user.username}
                          </p>
                          {user.user.isVerified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {user.user.name}
                        </p>
                      </div>
                    </Link>

                    {/* Don't show follow button for your own profile */}
                    {user.user.username !== me.username&& (
                      <Button
                        size="sm"
                        variant={
                          followStates[user.user.id] ? "outline" : "default"
                        }
                        onClick={() =>
                          handleFollow(user.user.id, followStates[user.user.id])
                        }
                        className="ml-2"
                      >
                        {followStates[user.user.id] ? "Following" : "Follow"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Total likes count at bottom */}
        {totalLikes > 0 && (
          <div className="border-t px-4 py-3 text-center">
            <p className="text-sm text-muted-foreground">
              {totalLikes.toLocaleString()}{" "}
              {totalLikes === 1 ? "like" : "likes"}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
