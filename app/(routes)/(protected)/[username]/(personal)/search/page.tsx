"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X, Hash, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { searchUsers } from "@/app/actions/users.actions";

const mockHashtags = [
  { tag: "photography", posts: "125M" },
  { tag: "travel", posts: "89M" },
  { tag: "food", posts: "156M" },
  { tag: "nature", posts: "78M" },
  { tag: "art", posts: "92M" },
  { tag: "fitness", posts: "67M" },
  { tag: "music", posts: "134M" },
  { tag: "fashion", posts: "201M" },
];

type mockUsers = {
  id: string;
  name: string;
  username: string;
  isVerified: boolean;
  profilePicUrl: string | null;
  DOB: Date | null;
  followers: {
    id: string;
  }[];
}[];

const mockPosts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  image: `https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24`,
  likes: Math.floor(Math.random() * 1000) + 100,
}));

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState({
    users: [] as unknown as mockUsers,
    hashtags: [] as typeof mockHashtags,
    posts: [] as typeof mockPosts,
  });
  const [isSearching, setIsSearching] = useState(false);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounce logic: runs whenever searchQuery changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery); // Delay updating debounced value
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler); // Clear previous timeout if query changes quickly
    };
  }, [searchQuery]);

  // Trigger actual search when debouncedQuery updates
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  // Save recent searches to localStorage
  const saveRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches.slice(0, 9)]; // Keep only 10 recent searches
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Remove individual recent search
  const removeRecentSearch = (query: string) => {
    const updated = recentSearches.filter((search) => search !== query);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Search functionality
  const performSearch = async (query: string) => {
    console.log("perform search called");
    if (!query.trim()) {
      setSearchResults({ users: [], hashtags: [], posts: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lowerQuery = query.toLowerCase();

    // Search users
    const users = (await searchUsers(query)) as unknown as mockUsers;

    // Search hashtags
    const filteredHashtags = mockHashtags.filter((hashtag) =>
      hashtag.tag.toLowerCase().includes(lowerQuery)
    );

    // For posts, we'll show all posts if there's a search query (in a real app, this would be more sophisticated)
    const filteredPosts = query.trim() ? mockPosts : [];

    setSearchResults({
      users: users,
      hashtags: [],
      posts: filteredPosts,
    });

    // Save to recent searches
    saveRecentSearch(query);
  };
  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Handle search submission
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults({ users: [], hashtags: [], posts: [] });
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
          {/* Categories */}
          {/* <div className="px-4 py-3 border-b">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                "For you",
                "Travel",
                "Architecture",
                "Food",
                "Nature",
                "Art",
                "Sports",
              ].map((category) => (
                <Button
                  key={category}
                  variant="secondary"
                  size="sm"
                  className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap"
                  onClick={() => handleSearchSubmit(category.toLowerCase())}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div> */}

          {/* Recent Searches */}
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

          {/* Explore Grid */}
          <div className="grid grid-cols-3 gap-0.5">
            {mockPosts.slice(0, 21).map((post) => (
              <Link
                href={`/post/${post.id}`}
                key={post.id}
                className="aspect-square relative"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={`Explore post ${post.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:opacity-90 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </>
      ) : (
        /* Search Results */
        <div className="p-4">
          {searchResults.users.length === 0 &&
          searchResults.hashtags.length === 0 &&
          searchResults.posts.length === 0 ? (
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
                {/* Top Users */}
                {searchResults.users.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Accounts</h3>
                    <div className="space-y-3">
                      {searchResults.users.slice(0, 3).map((user) => (
                        <Link
                          key={user.id}
                          href={`/${user.username}`}
                          className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={`https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24`}
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
                              {user.name} • {user.followers.length} followers
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Hashtags */}
                {searchResults.hashtags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Hashtags</h3>
                    <div className="space-y-3">
                      {searchResults.hashtags.slice(0, 3).map((hashtag) => (
                        <Link
                          key={hashtag.tag}
                          href={`/search?q=%23${hashtag.tag}`}
                          className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg"
                        >
                          <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                            <Hash className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-semibold">#{hashtag.tag}</p>
                            <p className="text-sm text-muted-foreground">
                              {hashtag.posts} posts
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
                  {searchResults.users.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.username}`}
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24`}
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
                            {user.name} • {user.followers.length} followers
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hashtags" className="mt-4">
                <div className="space-y-3">
                  {searchResults.hashtags.map((hashtag) => (
                    <Link
                      key={hashtag.tag}
                      href={`/search?q=%23${hashtag.tag}`}
                      className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg"
                    >
                      <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                        <Hash className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">#{hashtag.tag}</p>
                        <p className="text-sm text-muted-foreground">
                          {hashtag.posts} posts
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="posts" className="mt-4">
                <div className="grid grid-cols-3 gap-0.5">
                  {searchResults.posts.map((post) => (
                    <Link
                      href={`/post/${post.id}`}
                      key={post.id}
                      className="aspect-square relative"
                    >
                      <Image
                        src={
                          post.image ||
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
