"use client";

import { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X, Hash, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { searchUsers } from "@/app/actions/search.actions";
import { SearchedUsersType, SearchFeedType } from "@/app/actions/types";
import { FollowButton } from "@/components/follow-btn";
import { MeContext } from "@/components/me-context";
import useDebounce from "@/hooks/useDebounce";
import { SearchSkeleton } from "./SearchSkeleton";

export default function SearchPage({
  initialSearchFeed,
}: {
  initialSearchFeed: SearchFeedType;
}) {
  const me = useContext(MeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchFeed, setSearchFeed] = useState<SearchFeedType>();
  const [searchResults, setSearchResults] = useState<SearchedUsersType>();
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    setSearchFeed(initialSearchFeed);
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const saveRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches.slice(0, 3)];
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const removeRecentSearch = (query: string) => {
    const updated = recentSearches.filter((search) => search !== query);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const performSearch = async (query: string) => {
    console.log("perform search called");
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lowerQuery = query.toLowerCase();

    const users = await searchUsers(lowerQuery);

    setSearchResults(users);
    saveRecentSearch(query);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-9 pr-9 bg-muted"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
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
      </header>

      {!isSearching && !searchQuery ? (
        <>
          {recentSearches.length > 0 && (
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Recent</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-blue-500"
                >
                  Clear all
                </Button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 p-2 h-auto justify-start flex-1"
                      onClick={() => handleSearchSubmit(search)}
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{search}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeRecentSearch(search)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!searchFeed ? (
            <SearchSkeleton />
          ) : (
            <div className="grid grid-cols-3 gap-0.5">
              {searchFeed
                .flatMap((sf) => sf.posts)
                .flatMap((post) => (
                  <Link
                    href={`/posts/${post.id}`}
                    key={post.id}
                    className="aspect-square relative"
                  >
                    <Image
                      src={post.url}
                      alt={`Explore post ${post.id}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                ))}
            </div>
          )}
        </>
      ) : (
        <div className="p-4">
          {searchResults?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
            </div>
          ) : (
            <Tabs defaultValue="top" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="top">Top</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="hashtags">Tags</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
              </TabsList>

              <TabsContent value="top" className="mt-4 space-y-4">
                {searchResults && searchResults?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Accounts</h3>
                    <div className="space-y-3">
                      {searchResults.map((user) => (
                        <Link
                          key={user.id}
                          href={`/${user.username}`}
                          className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={user.profilePicUrl || "/user.png"}
                              alt={user.username}
                            />
                            <AvatarFallback>
                              {user.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <p className="font-semibold">{user.username}</p>
                              {user.isVerified && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {user.name} • {user.following.length} followers
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="accounts" className="mt-4">
                <div className="space-y-3">
                  {searchResults?.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.username}`}
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={user.profilePicUrl || "/user.png"}
                            alt={user.username}
                          />
                          <AvatarFallback>
                            {user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-semibold">{user.username}</p>
                            {user.isVerified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {user.name} • {user.following.length} followers
                          </p>
                        </div>
                      </div>
                      {user.id !== me?.id && (
                        <FollowButton
                          status={
                            user.following.some((f) => f.followerId === me?.id)
                              ? "Following"
                              : user.receivedFollowRequests.length > 0
                              ? "Requested"
                              : "Follow"
                          }
                          toUserId={user.id}
                          toUserIsPublic={user.public}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="posts" className="mt-4">
                <div className="grid grid-cols-3 gap-0.5">
                  {searchResults
                    ?.flatMap((sr) => sr.posts)
                    .map((post) => (
                      <Link
                        href={`/post/${post.id}`}
                        key={post.id}
                        className="aspect-square relative"
                      >
                        <Image
                          src={
                            post.url ||
                            "https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24"
                          }
                          alt={`Post ${post.id}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover hover:opacity-90 transition-opacity"
                        />
                      </Link>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
}
