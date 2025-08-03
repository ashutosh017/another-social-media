"use client";

import { fetchFollowers, removeFollower } from "@/app/actions/follow.actions";
import { FollowersType } from "@/app/actions/types";
import { FollowButton } from "@/components/follow-btn";
import { MeContext } from "@/components/me-context";
import { PrivateFollowPageMessage } from "@/components/private-follow-msg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, MessageCircle, Search, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState, useMemo } from "react";

export default function FollowersPage({
  initialFollowers,
  isAllowed,
}: {
  initialFollowers: FollowersType;
  isAllowed: boolean;
}) {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [followers, setFollowers] = useState<FollowersType>();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const me = useContext(MeContext);
  const [followerToRemove, setFollowerToRemove] = useState<{
    id: string;
    name: string;
    username: string;
    profilePicUrl: string;
  } | null>(null);

  useEffect(() => {
    setFollowers(initialFollowers);
  }, []);

  // Filter followers based on search query
  const filteredFollowers = useMemo(() => {
    if (!followers || !searchQuery.trim()) return followers;

    return followers.filter(
      ({ follower }) =>
        follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        follower.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [followers, searchQuery]);

  const handleRemoveFollower = async () => {
    setFollowers(
      (prev) =>
        prev &&
        prev.filter(
          (follower) =>
            follower.follower.username !== followerToRemove?.username
        )
    );
    setFollowerToRemove(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <button onClick={() => window.history.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold flex-1">Followers</h1>
      </header>
      {!isAllowed ? (
        <PrivateFollowPageMessage />
      ) : (
        <>
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-9 bg-muted pr-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>

          <div className="divide-y">
            {followers ? (
              filteredFollowers && filteredFollowers.length > 0 ? (
                <>
                  {searchQuery && (
                    <div className="px-4 py-2 text-sm text-muted-foreground bg-muted/50">
                      {filteredFollowers.length} result
                      {filteredFollowers.length !== 1 ? "s" : ""} for "
                      {searchQuery}"
                    </div>
                  )}
                  {filteredFollowers.map(({ dateCreated, follower }) => (
                    <div
                      key={follower.username}
                      className="flex items-center justify-between p-4"
                    >
                      <div
                        className="flex items-center flex-1 "
                        onClick={() => {
                          router.push(`/${follower.username}`);
                        }}
                      >
                        <Avatar className="h-12 w-12 mr-3">
                          <AvatarImage src={``} alt={follower.username} />
                          <AvatarFallback>
                            {follower.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{follower.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {follower.name}
                          </p>
                        </div>
                      </div>
                      {follower.username !== me?.username && (
                        <div className="flex justify-end items-center space-x-4">
                          <FollowButton
                            status={
                              follower.following.length > 0
                                ? "Following"
                                : follower.receivedFollowRequests.length > 0
                                ? "Requested"
                                : "Follow"
                            }
                            toUserId={follower.id}
                            toUserIsPublic={follower.public}
                          />
                          <Button
                            onClick={() =>
                              router.push(
                                `messages/${follower.username}`
                              )
                            }
                            variant={"default"}
                            size={"sm"}
                            className=""
                          >
                            <MessageCircle className="w-4 h-4  " />
                          </Button>
                          {username === me?.username && (
                            <X
                              onClick={() => {
                                setFollowerToRemove({
                                  id: follower.id,
                                  username: follower.username,
                                  profilePicUrl: follower.profilePicUrl ?? "",
                                  name: follower.name,
                                });
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : searchQuery ? (
                <div className="text-center py-6">
                  <p className="text-lg font-semibold">No results found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try searching for a different name or username.
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-lg font-semibold">No followers yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    When someone follows you, they'll show up here.
                  </p>
                </div>
              )
            ) : (
              <div className="py-4 text-center">Loading...</div>
            )}
          </div>

          <div
            className={cn(
              "fixed bottom-16 w-full max-w-md mx-auto bg-background rounded-t-xl shadow-lg border border-t px-6 py-5",
              !followerToRemove && "hidden"
            )}
          >
            {followerToRemove && (
              <>
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={followerToRemove.profilePicUrl || ""}
                      alt={followerToRemove.username}
                    />
                    <AvatarFallback>
                      {followerToRemove.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold">Remove follower?</p>
                  <p className="text-sm text-muted-foreground text-center">
                    Dopaminly won't tell {followerToRemove.username} they were
                    removed from your followers.
                  </p>
                </div>
                <div className="mt-6 space-y-2 ">
                  <button
                    onClick={() => {
                      handleRemoveFollower();
                      removeFollower(followerToRemove.id);
                    }}
                    className="w-full text-red-500 font-medium py-2 rounded-md hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setFollowerToRemove(null)}
                    className="w-full font-medium py-2 rounded-md hover:bg-accent transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
