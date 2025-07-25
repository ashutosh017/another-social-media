"use client";

import { fetchFollowing } from "@/app/actions/follow.actions";
import { FollowButton } from "@/components/follow-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { followingTyep } from "@/types/follow.types";
import { ArrowLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function FollowingPage() {
  const { username } = useParams<{ username: string }>();
  const [following, setFollowing] = useState<followingTyep>();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchFollowingCaller() {
      const fetchedFollowing = await fetchFollowing(username);
      console.log("fetched following: ", fetchedFollowing);
      setFollowing(fetchedFollowing);
    }
    fetchFollowingCaller();
  }, [username]);

  // Filter following based on search query
  const filteredFollowing = useMemo(() => {
    if (!following || !searchQuery.trim()) {
      return following;
    }

    const query = searchQuery.toLowerCase().trim();
    return following.filter(
      ({ following: user }) =>
        user.username.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query)
    );
  }, [following, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="./" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Following</h1>
      </header>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search following..."
            className="pl-9 pr-10 bg-muted"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="divide-y">
        {following ? (
          filteredFollowing && filteredFollowing.length > 0 ? (
            <>
              {searchQuery && (
                <div className="px-4 py-2 text-sm text-muted-foreground bg-muted/50">
                  {filteredFollowing.length} result
                  {filteredFollowing.length !== 1 ? "s" : ""} for "{searchQuery}
                  "
                </div>
              )}
              {filteredFollowing.map(({ dateCreated, following: user }) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4"
                >
                  <div
                    onClick={() => {
                      router.replace(`/${user.username}`);
                    }}
                    className="flex items-center flex-1"
                  >
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={``} alt={user.username} />
                      <AvatarFallback>
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <FollowButton
                    status="Following"
                    toUserId={user.id}
                    toUserIsPublic={user.public}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-6">
              {searchQuery ? (
                <>
                  <p className="text-lg font-semibold">No results found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try searching for a different name or username.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSearch}
                    className="mt-3"
                  >
                    Clear search
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">
                    {"You're not following anyone"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start exploring and follow people to see their posts.
                  </p>
                </>
              )}
            </div>
          )
        ) : (
          <div className="py-4 text-center">Loading...</div>
        )}
      </div>
    </div>
  );
}
